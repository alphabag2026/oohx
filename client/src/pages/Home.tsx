import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ChevronRight, Heart, Zap, Users, Lock, Sparkles, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * OohX Landing Page
 * Design Philosophy: Deep Red/Dark Tone - Sensual, Premium, Modern
 * - Dark burgundy background (#2a0f1a)
 * - Accent red (#d41159, #e63384)
 * - Sophisticated and intimate atmosphere
 * - Focus on influencer authenticity and AI innovation
 */
export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const creators = [
    {
      id: 1,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-1-BHLVrRATuQhehhX8Mr5y7P.webp",
      name: "Luna",
      price: "₩9,900/월",
      category: "소통 & 데이팅",
    },
    {
      id: 2,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-2-Wb9NAbjCapqXzwZoMwDUV9.webp",
      name: "Alex",
      price: "₩12,900/월",
      category: "프리미엄",
    },
    {
      id: 3,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-3-DP5xTQFjnZwKdq5wZNkrHC.webp",
      name: "Sophia",
      price: "₩14,900/월",
      category: "VIP",
    },
    {
      id: 4,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-4-mXFdyb5gxiBMRNTpqDjcvC.webp",
      name: "James",
      price: "₩11,900/월",
      category: "소통 & 데이팅",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/manus-storage/oohx-logo_e365d4bc.png"
              alt="OohX Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              OohX.ai
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-red-400 transition text-sm">
              기능
            </a>
            <a href="#creators" className="text-gray-300 hover:text-red-400 transition text-sm">
              크리에이터
            </a>
            <a href="#faq" className="text-gray-300 hover:text-red-400 transition text-sm">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-red-900/30 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4 text-red-400" />
                  <span className="hidden md:inline">{user.name || "사용자"}</span>
                </div>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-300 hover:bg-red-900/20 text-xs"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-sm"
                size="sm"
              >
                <LogIn className="w-3 h-3 mr-1" />
                로그인
              </Button>
            )}
            <Button
              className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-sm"
              size="sm"
            >
              시작하기
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-red-900/30 border border-red-500/50 text-red-300 text-sm font-medium">
                🔞 18+ 성인 플랫폼
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              당신만의
              <br />
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                특별한 AI 파트너
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              실존하는 인플루언서의 얼굴과 AI 기술이 만나
              <br />
              현실 같은 데이팅 경험을 만들어냅니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg">
                  크리에이터 탐색하기
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => (window.location.href = getLoginUrl())}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg"
                >
                  지금 시작하기
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-900/20 bg-transparent px-8 py-6 text-lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                더 알아보기
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-red-900/40 to-black/60 border border-red-500/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative z-10 text-center">
                <Heart className="w-24 h-24 mx-auto mb-4 text-red-500 opacity-50" />
                <p className="text-gray-400">AI 파트너 데이팅 경험</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              OohX의 특별한 기능
            </h2>
            <p className="text-xl text-gray-400">
              현실과 가상의 경계를 넘어서는 경험
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 hover:border-red-500/60 transition group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">실존 인플루언서</h3>
              <p className="text-gray-400 mb-4">
                유명 크리에이터의 초상권으로 만든 AI 파트너. 현실의 얼굴, 가상의 완벽한 파트너
              </p>
              <a href="#creators" className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm">
                자세히 보기
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 hover:border-red-500/60 transition group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">프리미엄 콘텐츠</h3>
              <p className="text-gray-400 mb-4">
                영상 섹스, 3D 섹스, 음성 통화 등 다양한 성인 콘텐츠. 구매 또는 임대 선택 가능
              </p>
              <a href="#" className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm">
                자세히 보기
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 hover:border-red-500/60 transition group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">프라이빗 데이팅</h3>
              <p className="text-gray-400 mb-4">
                당신만의 특별한 AI 파트너와 혼자만의 시간. 완벽한 프라이버시 보장
              </p>
              <a href="#" className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm">
                자세히 보기
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Gallery Section */}
      <section id="creators" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              OohX의 크리에이터
            </h2>
            <p className="text-xl text-gray-400">
              실존하는 인플루언서와 함께하는 특별한 경험
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {creators.map((creator) => (
              <div key={creator.id} className="group relative overflow-hidden rounded-xl cursor-pointer">
                <img
                  src={creator.img}
                  alt={creator.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                  <span className="text-xs text-red-400 mb-1">{creator.category}</span>
                  <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
                  <p className="text-red-400 text-sm mb-3">{creator.price}</p>
                  <Link href={`/creator/${creator.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-0 text-sm py-2">
                      프로필 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6">
              모든 크리에이터 보기
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Creator Benefits Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                크리에이터를 위한
                <br />
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  새로운 수익 기회
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                AI 기술로 인해 사라지는 일자리를 초상권 수익으로 보전하세요. 딥페이크 기술이 이미 당신의 이미지를 사용하고 있다면, 이제는 당신이 통제하고 수익화하세요.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>초상권 사용료 정기 수익</span>
                </li>
                <li className="flex gap-3">
                  <Lock className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>안전하고 투명한 계약 관리</span>
                </li>
                <li className="flex gap-3">
                  <Users className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>팬미팅 기회를 통한 추가 수익</span>
                </li>
              </ul>

              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6">
                크리에이터 등록하기
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <img
                src="/manus-storage/oohx-logo_e365d4bc.png"
                alt="OohX Logo"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            OohX는 어떻게 작동하나요?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "프로필 선택", desc: "좋아하는 크리에이터 선택" },
              { num: "2", title: "AI 파트너 생성", desc: "맞춤형 AI 파트너 생성" },
              { num: "3", title: "프라이빗 데이팅", desc: "혼자만의 시간 즐기기" },
              { num: "4", title: "팬미팅", desc: "실제 만남의 기회" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-black/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            자주 묻는 질문
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "OohX는 합법적인가요?",
                a: "네, OohX는 모든 크리에이터의 초상권 동의 하에 운영됩니다. 딥페이크 기술을 윤리적으로 활용하며, 크리에이터에게 정당한 보상을 제공합니다.",
              },
              {
                q: "내 개인정보는 안전한가요?",
                a: "절대적인 프라이버시 보호가 OohX의 핵심 가치입니다. 모든 데이터는 암호화되며, 당신의 활동은 완전히 비공개입니다.",
              },
              {
                q: "성인 콘텐츠만 있나요?",
                a: "아니요, OohX는 순수한 소통도 지원합니다. 성인 콘텐츠는 선택사항이며, 일반 대화와 팬 상호작용도 가능합니다.",
              },
              {
                q: "크리에이터로 등록하려면?",
                a: "초상권 동의 절차를 거친 후 등록 가능합니다. 당신의 이미지로 수익을 창출하고, 팬들과 만날 수 있는 기회를 얻습니다.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 hover:border-red-500/60 transition"
              >
                <h3 className="font-bold text-lg mb-3">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/30 to-black/30 border-t border-red-500/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            당신의 특별한 경험을 시작하세요
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            OohX에서 현실과 가상의 경계를 넘어 새로운 관계를 경험하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg">
                크리에이터 탐색하기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg"
              >
                지금 시작하기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button
              variant="outline"
              className="border-red-500/50 text-red-300 hover:bg-red-900/20 bg-transparent px-8 py-6 text-lg"
            >
              크리에이터 등록
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-red-500/30 bg-black/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="font-bold">OohX.ai</span>
              </div>
              <p className="text-sm text-gray-500">
                현실과 가상이 만나는 곳
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-red-400">AI 파트너</a></li>
                <li><a href="#" className="hover:text-red-400">프리미엄 콘텐츠</a></li>
                <li><a href="#" className="hover:text-red-400">팬미팅</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">크리에이터</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-red-400">등록하기</a></li>
                <li><a href="#" className="hover:text-red-400">수익 관리</a></li>
                <li><a href="#" className="hover:text-red-400">지원</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">법적</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-red-400">이용약관</a></li>
                <li><a href="#" className="hover:text-red-400">개인정보</a></li>
                <li><a href="#" className="hover:text-red-400">문의</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-500/30 pt-8">
            <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-black/30 rounded-lg border border-red-500/30">
              <h3 className="font-bold mb-3 text-red-400">토큰 연계</h3>
              <p className="text-sm text-gray-300 mb-4">
                암호화폐 지갑을 연결하여 OohX 토큰으로 프리미엄 콘텐츠를 구매하고, 크리에이터 초상권 수익을 받으세요.
              </p>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-6 py-2 text-sm">
                지갑 연결하기
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">© 2026 OohX.ai. 모든 권리 보유. 18세 이상만 이용 가능합니다.</p>
              <p className="text-xs text-gray-600">🚀 <span className="text-red-400 font-semibold">Xplay AI</span>로 제작되었습니다</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
