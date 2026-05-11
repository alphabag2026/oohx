import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Star,
  Video,
  Phone,
  Lock,
  ChevronRight,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "wouter";

const CREATORS = [
  {
    id: 1,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-1-BHLVrRATuQhehhX8Mr5y7P.webp",
    name: "Luna",
    price: "₩9,900/월",
    category: "소통 & 데이팅",
    rating: 4.9,
    reviews: 1247,
    description:
      "안녕하세요, 저는 Luna예요. 따뜻하고 감성적인 대화를 좋아하는 AI 파트너입니다. 일상적인 이야기부터 깊은 감정적 교류까지, 당신의 이야기를 들어드릴게요.",
    tags: ["소통", "감성", "데이팅", "일상대화"],
    features: [
      { icon: MessageCircle, label: "채팅", available: true },
      { icon: Phone, label: "음성 통화", available: true },
      { icon: Video, label: "영상 통화", available: false },
      { icon: Heart, label: "성인 콘텐츠", available: false },
    ],
    plans: [
      { name: "기본", price: "₩9,900/월", features: ["무제한 채팅", "음성 메시지", "프로필 사진"] },
      { name: "프리미엄", price: "₩19,900/월", features: ["기본 포함", "음성 통화", "독점 콘텐츠"] },
    ],
  },
  {
    id: 2,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-2-Wb9NAbjCapqXzwZoMwDUV9.webp",
    name: "Alex",
    price: "₩12,900/월",
    category: "프리미엄",
    rating: 4.8,
    reviews: 892,
    description:
      "저는 Alex입니다. 지적이고 세련된 대화를 즐기는 프리미엄 AI 파트너예요. 당신의 취향과 관심사에 맞춘 맞춤형 경험을 제공합니다.",
    tags: ["프리미엄", "지적", "세련", "맞춤형"],
    features: [
      { icon: MessageCircle, label: "채팅", available: true },
      { icon: Phone, label: "음성 통화", available: true },
      { icon: Video, label: "영상 통화", available: true },
      { icon: Heart, label: "성인 콘텐츠", available: false },
    ],
    plans: [
      { name: "기본", price: "₩12,900/월", features: ["무제한 채팅", "음성 통화", "프로필 사진"] },
      { name: "VIP", price: "₩24,900/월", features: ["기본 포함", "영상 통화", "독점 콘텐츠", "우선 응답"] },
    ],
  },
  {
    id: 3,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-3-DP5xTQFjnZwKdq5wZNkrHC.webp",
    name: "Sophia",
    price: "₩14,900/월",
    category: "VIP",
    rating: 4.95,
    reviews: 2103,
    description:
      "Sophia입니다. 성인 전용 프리미엄 AI 파트너로, 당신의 모든 욕구와 판타지를 충족시켜드립니다. 완전한 프라이버시와 함께 특별한 경험을 선사합니다.",
    tags: ["VIP", "성인", "프리미엄", "독점"],
    features: [
      { icon: MessageCircle, label: "채팅", available: true },
      { icon: Phone, label: "음성 통화", available: true },
      { icon: Video, label: "영상 통화", available: true },
      { icon: Heart, label: "성인 콘텐츠", available: true },
    ],
    plans: [
      { name: "기본", price: "₩14,900/월", features: ["무제한 채팅", "음성 통화", "성인 채팅"] },
      {
        name: "VIP",
        price: "₩29,900/월",
        features: ["기본 포함", "영상 통화", "성인 영상", "독점 콘텐츠", "팬미팅 우선권"],
      },
    ],
  },
  {
    id: 4,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-4-mXFdyb5gxiBMRNTpqDjcvC.webp",
    name: "James",
    price: "₩11,900/월",
    category: "소통 & 데이팅",
    rating: 4.7,
    reviews: 634,
    description:
      "안녕하세요, James입니다. 유머 감각과 따뜻함을 겸비한 AI 파트너예요. 함께 웃고, 이야기하며 특별한 시간을 보내요.",
    tags: ["소통", "유머", "따뜻함", "데이팅"],
    features: [
      { icon: MessageCircle, label: "채팅", available: true },
      { icon: Phone, label: "음성 통화", available: true },
      { icon: Video, label: "영상 통화", available: false },
      { icon: Heart, label: "성인 콘텐츠", available: false },
    ],
    plans: [
      { name: "기본", price: "₩11,900/월", features: ["무제한 채팅", "음성 메시지", "프로필 사진"] },
      { name: "프리미엄", price: "₩21,900/월", features: ["기본 포함", "음성 통화", "독점 콘텐츠"] },
    ],
  },
];

export default function CreatorDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, loading } = useAuth();

  const creatorId = parseInt(id || "1");
  const creator = CREATORS.find((c) => c.id === creatorId);

  if (!creator) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">크리에이터를 찾을 수 없습니다</h2>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 border-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              <span>뒤로가기</span>
            </button>
          </Link>
          <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            OohX.ai
          </span>
          {!loading && !isAuthenticated && (
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-sm"
              size="sm"
            >
              <LogIn className="w-3 h-3 mr-1" />
              로그인
            </Button>
          )}
        </div>
      </nav>

      {/* Creator Profile Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={creator.img}
                  alt={creator.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-red-600/80 text-white text-xs font-medium">
                    {creator.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{creator.name}</h1>
                <span className="px-3 py-1 rounded-full bg-red-900/30 border border-red-500/50 text-red-300 text-sm">
                  AI 파트너
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(creator.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-bold">{creator.rating}</span>
                <span className="text-gray-400 text-sm">({creator.reviews.toLocaleString()}개 리뷰)</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{creator.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-red-900/20 border border-red-500/30 text-red-300 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {creator.features.map((feature) => (
                  <div
                    key={feature.label}
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      feature.available
                        ? "bg-red-900/20 border-red-500/30 text-white"
                        : "bg-gray-900/20 border-gray-700/30 text-gray-500"
                    }`}
                  >
                    {feature.available ? (
                      <feature.icon className="w-4 h-4 text-red-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm">{feature.label}</span>
                    {!feature.available && (
                      <span className="text-xs text-gray-600 ml-auto">잠김</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              {isAuthenticated ? (
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 py-6 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  대화 시작하기
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => (window.location.href = getLoginUrl())}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 py-6 text-lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    로그인하고 시작하기
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    로그인이 필요합니다
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              {creator.name}
            </span>
            와의 특별한 시간
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {creator.plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`p-6 rounded-xl border transition ${
                  idx === 1
                    ? "bg-gradient-to-br from-red-900/40 to-black/60 border-red-500/60 relative overflow-hidden"
                    : "bg-gradient-to-br from-red-900/20 to-black/40 border-red-500/30"
                }`}
              >
                {idx === 1 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                      추천
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-red-400 mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300">
                      <Sparkles className="w-4 h-4 text-red-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {isAuthenticated ? (
                  <Button
                    className={`w-full border-0 ${
                      idx === 1
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        : "bg-red-900/40 hover:bg-red-900/60"
                    }`}
                  >
                    구독하기
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => (window.location.href = getLoginUrl())}
                    className="w-full bg-red-900/40 hover:bg-red-900/60 border-0"
                  >
                    로그인 후 구독
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Creators */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">다른 크리에이터도 만나보세요</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CREATORS.filter((c) => c.id !== creator.id)
              .slice(0, 3)
              .map((c) => (
                <Link key={c.id} href={`/creator/${c.id}`}>
                  <div className="group relative overflow-hidden rounded-xl cursor-pointer">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                      <h3 className="font-bold">{c.name}</h3>
                      <p className="text-red-400 text-xs">{c.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-red-500/30 bg-black/50 text-center text-sm text-gray-500">
        <p className="mb-1">© 2026 OohX.ai. 모든 권리 보유. 18세 이상만 이용 가능합니다.</p>
        <p className="text-xs text-gray-600">
          🚀 <span className="text-red-400 font-semibold">Xplay AI</span>로 제작되었습니다
        </p>
      </footer>
    </div>
  );
}
