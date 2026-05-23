import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getCreators, getCreatorById } from "./db";
import { ENV } from "./_core/env";

const PROMPTCHAN_BASE_URL = "https://prod.aicloudnetservices.com";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  creators: router({
    list: publicProcedure.query(() => getCreators()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getCreatorById(input.id)),
  }),

  ai: router({
    // AI 이미지 생성
    generateImage: publicProcedure
      .input(
        z.object({
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
        })
      )
      .mutation(async ({ input }) => {
        const apiKey = ENV.promptchanApiKey;
        if (!apiKey) {
          throw new Error("Promptchan API key not configured");
        }

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
          throw new Error(`Promptchan API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json() as { image: string; gems: number };
        return {
          imageUrl: data.image,
          gemsRemaining: data.gems,
        };
      }),

    // AI 채팅
    chat: publicProcedure
      .input(
        z.object({
          message: z.string().min(1),
          characterName: z.string().default("Luna"),
          characterPersonality: z.string().default("Warm, playful, and affectionate"),
          characterScenario: z.string().default("You are an AI companion"),
          chatHistory: z.array(z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })).default([]),
          userName: z.string().default("User"),
        })
      )
      .mutation(async ({ input }) => {
        const apiKey = ENV.promptchanApiKey;
        if (!apiKey) {
          throw new Error("Promptchan API key not configured");
        }

        // Convert chat history to Promptchan format
        const chatHistory = input.chatHistory.map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

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
              scenario: input.characterScenario,
              sexuality: "straight",
              openness: 80,
              emotions: 80,
              age: 25,
              gender: "female",
            },
            chatHistory,
            isRoleplay: false,
            redo: false,
            userName: input.userName,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Promptchan chat API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json() as {
          message: string;
          chatHistory: unknown[];
          audio?: string;
          selfie?: string;
        };

        return {
          message: data.message,
          chatHistory: data.chatHistory,
          selfieUrl: data.selfie,
        };
      }),

    // API 상태 확인
    checkApiStatus: publicProcedure.query(async () => {
      const apiKey = ENV.promptchanApiKey;
      return {
        configured: !!apiKey,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
