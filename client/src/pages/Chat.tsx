import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLoginUrl } from "@/const";
import { ArrowLeft, Send, Loader2, Heart, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Static creator data (will be replaced by DB in A2)
const STATIC_CREATORS: Record<number, {
  name: string;
  imageUrl: string;
  personality: string;
  greeting: string;
}> = {
  1: {
    name: "Luna",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-1-BHLVrRATuQhehhX8Mr5y7P.webp",
    personality: "Warm, playful, and affectionate AI companion. You love deep conversations and making people feel special.",
    greeting: "안녕하세요! 저는 Luna예요. 오늘 어떤 이야기를 나눠볼까요? 💕",
  },
  2: {
    name: "Alex",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-2-Wb9NAbjCapqXzwZoMwDUV9.webp",
    personality: "Confident, charming, and witty. You enjoy intellectual conversations and playful banter.",
    greeting: "Hey there! I'm Alex. What's on your mind today? 😊",
  },
  3: {
    name: "Sophia",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-3-DP5xTQFjnZwKdq5wZNkrHC.webp",
    personality: "Elegant, sophisticated, and caring. You speak with grace and always make people feel heard.",
    greeting: "Hello, darling! I'm Sophia. I'm so glad you're here. 🌹",
  },
  4: {
    name: "James",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-4-mXFdyb5gxiBMRNTpqDjcvC.webp",
    personality: "Adventurous, funny, and supportive. You love sharing stories and making people laugh.",
    greeting: "What's up! I'm James. Ready for an amazing conversation? 🔥",
  },
};

interface Message {
  role: "user" | "assistant";
  content: string;
  selfieUrl?: string | null;
  timestamp: Date;
}

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const creatorId = parseInt(id ?? "1");
  const creator = STATIC_CREATORS[creatorId] ?? STATIC_CREATORS[1];

  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: creator.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.message,
        selfieUrl: data.selfieUrl,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    },
    onError: (err) => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "죄송해요, 잠시 연결이 끊겼어요. 다시 시도해 주세요. 💔",
        timestamp: new Date(),
      }]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));

    sendMessage.mutate({
      creatorId,
      message: input.trim(),
      characterName: creator.name,
      characterPersonality: creator.personality,
      chatHistory,
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <Link href={`/creator/${creatorId}`}>
            <button className="p-2 rounded-full hover:bg-red-900/30 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <img
            src={creator.imageUrl}
            alt={creator.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
          />
          <div className="flex-1">
            <h2 className="font-bold text-sm">{creator.name}</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-green-400">온라인</span>
            </div>
          </div>
          <Link href="/ai-generate">
            <button className="p-2 rounded-full hover:bg-red-900/30 transition" title="AI 이미지 생성">
              <ImageIcon className="w-5 h-5 text-red-400" />
            </button>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pt-20 pb-24 px-4 max-w-2xl mx-auto w-full">
        {!isAuthenticated && (
          <div className="mb-4 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-center">
            <p className="text-sm text-red-300 mb-2">로그인하면 대화 내용이 저장됩니다</p>
            <a href={getLoginUrl()}>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 border-0">
                로그인하기
              </Button>
            </a>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "assistant" && (
                <img
                  src={creator.imageUrl}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                />
              )}
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {/* Selfie image if available */}
                {msg.selfieUrl && (
                  <div className="rounded-xl overflow-hidden border border-red-500/30">
                    <img src={msg.selfieUrl} alt="AI selfie" className="max-w-[200px] object-cover" />
                  </div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-red-600 to-red-700 text-white rounded-tr-sm"
                    : "bg-white/10 backdrop-blur-sm text-white rounded-tl-sm border border-white/10"
                }`}>
                  {msg.content}
                </div>
                <span className="text-xs text-gray-500 px-1">
                  {msg.timestamp.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <img
                src={creator.imageUrl}
                alt={creator.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
              />
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/10 border border-white/10">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-red-900/30 px-4 py-3">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isAuthenticated ? `${creator.name}에게 메시지 보내기...` : "로그인 후 채팅 가능합니다"}
            disabled={isTyping}
            className="flex-1 bg-white/10 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 rounded-full px-4"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 rounded-full w-11 h-11 p-0 flex-shrink-0"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
