import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Promptchan API Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PROMPTCHAN_API_KEY = "xcOMX_MER7wLXRNyS0sMtg";
  });

  it("should have PROMPTCHAN_API_KEY configured", () => {
    const apiKey = process.env.PROMPTCHAN_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(typeof apiKey).toBe("string");
  });

  it("should call Promptchan image API with correct headers", async () => {
    const mockImageResponse = {
      image: "https://example.com/generated-image.jpg",
      gems: 750,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockImageResponse,
    });

    const apiKey = process.env.PROMPTCHAN_API_KEY!;
    const response = await fetch("https://prod.aicloudnetservices.com/api/external/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        style: "Cinematic",
        prompt: "a beautiful woman",
        quality: "Ultra",
        image_size: "512x768",
        age_slider: 25,
        seed: -1,
        poses: "Default",
        filter: "Default",
        emotion: "Default",
      }),
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://prod.aicloudnetservices.com/api/external/create",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        }),
      })
    );

    const data = await response.json();
    expect(data).toHaveProperty("image");
    expect(data).toHaveProperty("gems");
  });

  it("should call Promptchan chat API with correct structure", async () => {
    const mockChatResponse = {
      message: "Hello! How are you today?",
      chatHistory: [
        { role: "user", content: "Hi!" },
        { role: "assistant", content: "Hello! How are you today?" },
      ],
      audio: null,
      selfie: null,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockChatResponse,
    });

    const apiKey = process.env.PROMPTCHAN_API_KEY!;
    const response = await fetch("https://prod.aicloudnetservices.com/api/external/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        message: "Hi!",
        characterData: {
          name: "Luna",
          personality: "Warm and playful",
          scenario: "You are an AI companion",
          sexuality: "straight",
          openness: 80,
          emotions: 80,
          age: 25,
          gender: "female",
        },
        chatHistory: [],
        isRoleplay: false,
        redo: false,
        userName: "User",
      }),
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://prod.aicloudnetservices.com/api/external/chat",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-api-key": apiKey,
        }),
      })
    );

    const data = await response.json();
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("chatHistory");
  });

  it("should handle API error responses gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => "Invalid API key",
    });

    const apiKey = "invalid_key";
    const response = await fetch("https://prod.aicloudnetservices.com/api/external/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ prompt: "test" }),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);
  });
});
