import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  getCreators, getCreatorById, upsertCreator, deleteCreator,
  getOrCreateChatSession, getChatMessages, saveChatMessage,
  saveGeneratedImage, getUserGeneratedImages, getPublicGallery,
} from "./db";
import { ENV } from "./_core/env";

const PROMPTCHAN_BASE_URL = "https://prod.aicloudnetservices.com";

export const appRouter = router({
  system: systemRouter,

  // ============ Auth ============
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ Creators ============
  creators: router({
    list: publicProcedure.query(() => getCreators()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getCreatorById(input.id)),

    // Admin: create/update creator
    upsert: protectedProcedure
      .input(z.object({
        id: z.number().optional(),
        name: z.string().min(1),
        imageUrl: z.string().url(),
        price: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        rating: z.string().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await upsertCreator({
          ...input,
          name: input.name,
          imageUrl: input.imageUrl,
          price: input.price,
        });
        return { success: true };
      }),

    // Admin: delete creator
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await deleteCreator(input.id);
        return { success: true };
      }),
  }),

  // ============ Chat ============
  chat: router({
    // Get or create session + load history
    getSession: protectedProcedure
      .input(z.object({ creatorId: z.number() }))
      .query(async ({ ctx, input }) => {
        const session = await getOrCreateChatSession(ctx.user.id, input.creatorId);
        const messages = await getChatMessages(session.id);
        return { session, messages };
      }),

    // Send message and get AI reply
    sendMessage: protectedProcedure
      .input(z.object({
        creatorId: z.number(),
        message: z.string().min(1),
        characterName: z.string().default("Luna"),
        characterPersonality: z.string().default("Warm, playful, and affectionate AI companion"),
        chatHistory: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).default([]),
      }))
      .mutation(async ({ ctx, input }) => {
        const apiKey = ENV.promptchanApiKey;
        if (!apiKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Promptchan API key not configured" });

        // Get or create session
        const session = await getOrCreateChatSession(ctx.user.id, input.creatorId);

        // Save user message to DB
        await saveChatMessage({
          sessionId: session.id,
          role: "user",
          content: input.message,
        });

        // Call Promptchan chat API
        const response = await fetch(`${PROMPTCHAN_BASE_URL}/api/external/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            message: input.message,
            characterData: {
              name: input.characterName,
              personality: input.characterPersonality,
              scenario: `You are ${input.characterName}, a warm and engaging AI companion on OohX platform.`,
              sexuality: "straight",
              openness: 80,
              emotions: 80,
              age: 25,
              gender: "female",
            },
            chatHistory: input.chatHistory,
            isRoleplay: false,
            redo: false,
            userName: ctx.user.name ?? "User",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Promptchan API error: ${response.status}` });
        }

        const data = await response.json() as {
          message: string;
          chatHistory: unknown[];
          selfie?: string;
        };

        // Save assistant reply to DB
        await saveChatMessage({
          sessionId: session.id,
          role: "assistant",
          content: data.message,
          selfieUrl: data.selfie ?? null,
        });

        return {
          message: data.message,
          selfieUrl: data.selfie ?? null,
          sessionId: session.id,
        };
      }),
  }),

  // ============ AI Image Generation ============
  ai: router({
    generateImage: publicProcedure
      .input(z.object({
        prompt: z.string().min(1),
        style: z.enum([
          "Cinematic", "Anime", "Hyperreal", "Hyperanime", "K-Pop",
          "Fur", "Furtoon", "Render XL+", "Illustration XL+", "Anime XL",
          "Anime XL+", "Hardcore XL", "Cinematic XL", "Photo XL+",
          "Hyperreal XL+", "Hyperreal XL+ v2", "Photo XL+ v2"
        ]).default("Cinematic"),
        filter: z.string().default("Default"),
        emotion: z.string().default("Default"),
        quality: z.enum(["Ultra", "Extreme", "Max"]).default("Ultra"),
        image_size: z.enum(["512x512", "512x768", "768x512"]).default("512x768"),
        negative_prompt: z.string().optional(),
        age_slider: z.number().min(18).default(25),
        isPublic: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        const apiKey = ENV.promptchanApiKey;
        if (!apiKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Promptchan API key not configured" });

        const response = await fetch(`${PROMPTCHAN_BASE_URL}/api/external/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            style: input.style,
            filter: input.filter,
            emotion: input.emotion,
            prompt: input.prompt,
            quality: input.quality,
            image_size: input.image_size,
            negative_prompt: input.negative_prompt ?? "",
            age_slider: input.age_slider,
            seed: -1,
            poses: "Default",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Promptchan API error: ${response.status}` });
        }

        const data = await response.json() as { image: string; gems: number };
        let imageUrl = data.image;
        if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("data:")) {
          imageUrl = `data:image/jpeg;base64,${imageUrl}`;
        }

        // Save to DB if user is logged in
        if (ctx.user) {
          await saveGeneratedImage({
            userId: ctx.user.id,
            prompt: input.prompt,
            style: input.style,
            imageUrl,
            isPublic: input.isPublic,
          });
        }

        return { imageUrl, gemsRemaining: data.gems };
      }),

    // Get user's image history
    myImages: protectedProcedure.query(async ({ ctx }) => {
      return getUserGeneratedImages(ctx.user.id);
    }),

    // Public gallery
    gallery: publicProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input }) => {
        return getPublicGallery(input.limit);
      }),

    checkApiStatus: publicProcedure.query(async () => {
      return { configured: !!ENV.promptchanApiKey };
    }),
  }),
});

export type AppRouter = typeof appRouter;
