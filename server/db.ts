import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, creators, InsertCreator,
  chatSessions, chatMessages, generatedImages,
  InsertChatSession, InsertChatMessage, InsertGeneratedImage
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Creators ============

export async function getCreators() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get creators: database not available");
    return [];
  }

  return db.select().from(creators).where(eq(creators.isActive, true));
}

export async function getAllCreators() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get creators: database not available");
    return [];
  }
  return db.select().from(creators).orderBy(creators.id);
}

export async function getCreatorById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get creator: database not available");
    return undefined;
  }

  const result = await db.select().from(creators).where(eq(creators.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertCreator(creator: InsertCreator): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert creator: database not available");
    return;
  }

  await db.insert(creators).values(creator).onDuplicateKeyUpdate({
    set: {
      name: creator.name,
      imageUrl: creator.imageUrl,
      price: creator.price,
      description: creator.description,
      category: creator.category,
      tags: creator.tags,
      rating: creator.rating,
      reviewCount: creator.reviewCount,
      isActive: creator.isActive,
    },
  });
}

export async function deleteCreator(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(creators).where(eq(creators.id, id));
}

// ============ Chat Sessions ============

export async function getOrCreateChatSession(userId: number, creatorId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(chatSessions)
    .where(and(eq(chatSessions.userId, userId), eq(chatSessions.creatorId, creatorId)))
    .limit(1);

  if (existing.length > 0) return existing[0];

  const result = await db.insert(chatSessions).values({ userId, creatorId });
  const newSession = await db.select().from(chatSessions)
    .where(eq(chatSessions.id, Number(result[0].insertId)))
    .limit(1);
  return newSession[0];
}

export async function getChatMessages(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.createdAt);
}

export async function saveChatMessage(msg: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values(msg);
}

// ============ Generated Images ============

export async function saveGeneratedImage(img: InsertGeneratedImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(generatedImages).values(img);
  return Number(result[0].insertId);
}

export async function getUserGeneratedImages(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(generatedImages)
    .where(eq(generatedImages.userId, userId))
    .orderBy(desc(generatedImages.createdAt))
    .limit(50);
}

export async function getPublicGallery(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(generatedImages)
    .where(eq(generatedImages.isPublic, true))
    .orderBy(desc(generatedImages.createdAt))
    .limit(limit);
}
