import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getCreators: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Luna",
      imageUrl: "https://example.com/luna.webp",
      price: "₩9,900/월",
      description: "Test creator",
      category: "소통 & 데이팅",
      tags: '["소통","감성"]',
      rating: "4.9",
      reviewCount: 1247,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Alex",
      imageUrl: "https://example.com/alex.webp",
      price: "₩12,900/월",
      description: "Test creator 2",
      category: "프리미엄",
      tags: '["프리미엄","지적"]',
      rating: "4.8",
      reviewCount: 892,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getCreatorById: vi.fn().mockImplementation((id: number) => {
    if (id === 1) {
      return Promise.resolve({
        id: 1,
        name: "Luna",
        imageUrl: "https://example.com/luna.webp",
        price: "₩9,900/월",
        description: "Test creator",
        category: "소통 & 데이팅",
        tags: '["소통","감성"]',
        rating: "4.9",
        reviewCount: 1247,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return Promise.resolve(undefined);
  }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  upsertCreator: vi.fn(),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("creators router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("list returns all active creators", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.creators.list();

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe("Luna");
    expect(result[1]?.name).toBe("Alex");
  });

  it("getById returns a creator by id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.creators.getById({ id: 1 });

    expect(result).toBeDefined();
    expect(result?.name).toBe("Luna");
    expect(result?.price).toBe("₩9,900/월");
  });

  it("getById returns undefined for non-existent creator", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.creators.getById({ id: 999 });

    expect(result).toBeUndefined();
  });
});
