import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/lib/i18n";
import { ChevronRight, Zap, Users, Lock, Sparkles, LogIn, LogOut, User, Globe } from "lucide-react";
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
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const creators = [
    {
      id: 1,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-1-BHLVrRATuQhehhX8Mr5y7P.webp",
      name: "Luna",
      price: lang === "ko" ? "₩9,900/월" : lang === "zh" ? "₩9,900/月" : "₩9,900/mo",
      category: lang === "ko" ? "소통 & 데이팅" : lang === "zh" ? "交流 & 约会" : "Chat & Dating",
    },
    {
      id: 2,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-2-Wb9NAbjCapqXzwZoMwDUV9.webp",
      name: "Alex",
      price: lang === "ko" ? "₩12,900/월" : lang === "zh" ? "₩12,900/月" : "₩12,900/mo",
      category: lang === "ko" ? "프리미엄" : lang === "zh" ? "高级" : "Premium",
    },
    {
      id: 3,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-3-DP5xTQFjnZwKdq5wZNkrHC.webp",
      name: "Sophia",
      price: lang === "ko" ? "₩14,900/월" : lang === "zh" ? "₩14,900/月" : "₩14,900/mo",
      category: "VIP",
    },
    {
      id: 4,
      img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-4-mXFdyb5gxiBMRNTpqDjcvC.webp",
      name: "James",
      price: lang === "ko" ? "₩11,900/월" : lang === "zh" ? "₩11,900/月" : "₩11,900/mo",
      category: lang === "ko" ? "소통 & 데이팅" : lang === "zh" ? "交流 & 约会" : "Chat & Dating",
    },
  ];

  const featureIcons = [<Users className="w-6 h-6" />, <Zap className="w-6 h-6" />, <Lock className="w-6 h-6" />];

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/oohx-logo.png"
              alt="OohX Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              OohX.ai
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-red-400 transition text-sm">
              {t.nav.features}
            </a>
            <a href="#creators" className="text-gray-300 hover:text-red-400 transition text-sm">
              {t.nav.creators}
            </a>
            <a href="#faq" className="text-gray-300 hover:text-red-400 transition text-sm">
              {t.nav.faq}
            </a>
            <Link href="/ai-generate" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600/30 to-pink-600/30 border border-red-500/40 text-red-300 hover:from-red-600/50 hover:to-pink-600/50 transition text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              AI 생성
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/40 transition text-sm text-gray-300"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang?.flag} {currentLang?.label}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-red-500/30 shadow-xl overflow-hidden z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-red-900/30 transition ${lang === l.code ? "text-red-400 bg-red-900/20" : "text-gray-300"}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                  {t.nav.logout}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-sm"
                size="sm"
              >
                <LogIn className="w-3 h-3 mr-1" />
                {t.nav.login}
              </Button>
            )}
            <Button
              className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-sm"
              size="sm"
            >
              {t.nav.start}
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-red-900/30 border border-red-500/50 text-red-300 text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title1}
              <br />
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg">
                  {t.hero.ctaAuth}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => (window.location.href = getLoginUrl())}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg"
                >
                  {t.hero.cta}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-900/20 bg-transparent px-8 py-6 text-lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.learnMore}
              </Button>
            </div>
          </div>

          {/* Hero Logo Image */}
          <div className="mt-16 relative flex justify-center">
            <div className="relative w-72 md:w-96">
              <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="/oohx-logo.png"
                alt="OohX.ai"
                className="relative z-10 w-full rounded-3xl shadow-2xl shadow-red-900/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-400">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.features.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 hover:border-red-500/60 transition group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {featureIcons[idx]}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <a href="#" className="text-red-400 hover:text-red-300 flex items-center gap-2">
                  {t.features.learnMore}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Gallery Section */}
      <section id="creators" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.creatorsSection.title}
            </h2>
            <p className="text-xl text-gray-400">
              {t.creatorsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {creators.map((creator) => (
              <div key={creator.id} className="group relative overflow-hidden rounded-xl">
                <img
                  src={creator.img}
                  alt={creator.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 rounded-full bg-red-600/80 text-white text-xs font-medium">
                    {creator.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
                  <p className="text-red-400 text-sm mb-3">{creator.price}</p>
                  <Link href={`/creator/${creator.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-0 text-sm py-2">
                      {t.creatorsSection.viewProfile}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6">
              {t.creatorsSection.viewAll}
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
                {t.benefits.title1}
                <br />
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  {t.benefits.title2}
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                {t.benefits.desc}
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>{t.benefits.items[0]}</span>
                </li>
                <li className="flex gap-3">
                  <Lock className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>{t.benefits.items[1]}</span>
                </li>
                <li className="flex gap-3">
                  <Users className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span>{t.benefits.items[2]}</span>
                </li>
              </ul>

              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6">
                {t.benefits.cta}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <img
                src="/oohx-logo.png"
                alt="OohX Logo"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl shadow-red-900/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t.howItWorks.title}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {t.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-red-500/50" />
                  </div>
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
            {t.faq.title}
          </h2>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-red-900/10 to-black/40 border border-red-500/20">
                <h3 className="font-bold mb-3 text-red-300">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/30 to-black/30 border-t border-red-500/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg">
                {t.cta.startAuth}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 px-8 py-6 text-lg"
              >
                {t.cta.start}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button
              variant="outline"
              className="border-red-500/50 text-red-300 hover:bg-red-900/20 bg-transparent px-8 py-6 text-lg"
            >
              {t.cta.register}
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
                <img
                  src="/oohx-logo.png"
                  alt="OohX Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-bold">OohX.ai</span>
              </div>
              <p className="text-sm text-gray-500">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {t.footer.serviceItems.map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-red-400">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.creator}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {t.footer.creatorItems.map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-red-400">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {t.footer.legalItems.map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-red-400">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-red-500/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              {t.footer.copyright}
            </div>
            <div className="flex items-center gap-3">
              {/* Language switcher in footer */}
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-sm transition ${lang === l.code ? "text-red-400" : "text-gray-500 hover:text-gray-300"}`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-900/20 text-xs"
              >
                지갑 연결하기
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p className="text-xs text-gray-600">🚀 <span className="text-red-400 font-semibold">Xplay AI</span>로 제작되었습니다</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
