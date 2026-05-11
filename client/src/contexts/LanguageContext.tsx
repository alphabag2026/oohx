import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, getTranslation, Translations } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("oohx-lang");
    if (saved === "ko" || saved === "en" || saved === "zh") return saved;
    // 브라우저 언어 자동 감지
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) return "zh";
    if (browserLang.startsWith("ko")) return "ko";
    return "ko"; // 기본값: 한국어
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("oohx-lang", newLang);
  };

  const t = getTranslation(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
