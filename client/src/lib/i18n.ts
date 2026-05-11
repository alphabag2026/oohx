export type Language = "ko" | "en" | "zh";

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export const translations = {
  ko: {
    nav: {
      features: "기능",
      creators: "크리에이터",
      faq: "FAQ",
      login: "로그인",
      logout: "로그아웃",
      start: "시작하기",
    },
    hero: {
      badge: "🔞 18+ 성인 플랫폼",
      title1: "당신만의",
      title2: "특별한 AI 파트너",
      subtitle: "실존하는 인플루언서의 얼굴과 AI 기술이 만나\n현실 같은 데이팅 경험을 만들어냅니다",
      cta: "지금 시작하기",
      ctaAuth: "크리에이터 탐색하기",
      learnMore: "더 알아보기",
    },
    features: {
      title: "OohX의 특별한 기능",
      subtitle: "현실과 가상의 경계를 넘어서는 경험",
      items: [
        {
          title: "실존 인플루언서",
          desc: "유명 크리에이터의 초상권으로 만든 AI 파트너. 현실의 얼굴, 가상의 완벽한 파트너",
        },
        {
          title: "프리미엄 콘텐츠",
          desc: "영상 섹스, 3D 섹스, 음성 통화 등 다양한 성인 콘텐츠. 구매 또는 임대 선택 가능",
        },
        {
          title: "프라이빗 데이팅",
          desc: "당신만의 특별한 AI 파트너와 혼자만의 시간. 완벽한 프라이버시 보장",
        },
      ],
      learnMore: "자세히 보기",
    },
    creatorsSection: {
      title: "OohX의 크리에이터",
      subtitle: "실존하는 인플루언서와 함께하는 특별한 경험",
      viewAll: "모든 크리에이터 보기",
      viewProfile: "프로필 보기",
    },
    benefits: {
      title1: "크리에이터를 위한",
      title2: "새로운 수익 기회",
      desc: "AI 기술로 인해 사라지는 일자리를 초상권 수익으로 보전하세요. 딥페이크 기술이 이미 당신의 이미지를 사용하고 있다면, 이제는 당신이 통제하고 수익화하세요.",
      items: ["초상권 사용료 정기 수익", "안전하고 투명한 계약 관리", "팬미팅 기회를 통한 추가 수익"],
      cta: "크리에이터 등록하기",
    },
    howItWorks: {
      title: "OohX는 어떻게 작동하나요?",
      steps: [
        { title: "프로필 선택", desc: "좋아하는 크리에이터 선택" },
        { title: "AI 파트너 생성", desc: "맞춤형 AI 파트너 생성" },
        { title: "프라이빗 데이팅", desc: "혼자만의 시간 즐기기" },
        { title: "팬미팅", desc: "실제 만남의 기회" },
      ],
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
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
      ],
    },
    cta: {
      title: "당신의 특별한 경험을 시작하세요",
      subtitle: "OohX에서 현실과 가상의 경계를 넘어 새로운 관계를 경험하세요",
      start: "지금 시작하기",
      startAuth: "크리에이터 탐색하기",
      register: "크리에이터 등록",
    },
    footer: {
      tagline: "현실과 가상이 만나는 곳",
      services: "서비스",
      serviceItems: ["AI 파트너", "프리미엄 콘텐츠", "팬미팅"],
      creator: "크리에이터",
      creatorItems: ["등록하기", "수익 관리", "지원"],
      legal: "법적",
      legalItems: ["이용약관", "개인정보", "문의"],
      copyright: "© 2025 OohX.ai. All rights reserved. 18+ only.",
    },
  },
  en: {
    nav: {
      features: "Features",
      creators: "Creators",
      faq: "FAQ",
      login: "Login",
      logout: "Logout",
      start: "Get Started",
    },
    hero: {
      badge: "🔞 18+ Adult Platform",
      title1: "Your Own",
      title2: "Special AI Partner",
      subtitle: "Real influencer faces meet AI technology\nto create a dating experience like reality",
      cta: "Start Now",
      ctaAuth: "Explore Creators",
      learnMore: "Learn More",
    },
    features: {
      title: "OohX Special Features",
      subtitle: "Experience beyond the boundary of reality and virtual",
      items: [
        {
          title: "Real Influencers",
          desc: "AI partners created with real creator likeness rights. Real faces, perfect virtual partners",
        },
        {
          title: "Premium Content",
          desc: "Various adult content including video, 3D, voice calls. Choose to buy or rent",
        },
        {
          title: "Private Dating",
          desc: "Private time with your special AI partner. Complete privacy guaranteed",
        },
      ],
      learnMore: "Learn More",
    },
    creatorsSection: {
      title: "OohX Creators",
      subtitle: "Special experiences with real influencers",
      viewAll: "View All Creators",
      viewProfile: "View Profile",
    },
    benefits: {
      title1: "New Revenue Opportunities",
      title2: "for Creators",
      desc: "Protect jobs lost to AI technology with likeness rights revenue. If deepfake technology is already using your image, now you control and monetize it.",
      items: [
        "Regular income from likeness rights",
        "Safe and transparent contract management",
        "Additional income through fan meetings",
      ],
      cta: "Register as Creator",
    },
    howItWorks: {
      title: "How Does OohX Work?",
      steps: [
        { title: "Choose Profile", desc: "Select your favorite creator" },
        { title: "Create AI Partner", desc: "Generate a customized AI partner" },
        { title: "Private Dating", desc: "Enjoy your private time" },
        { title: "Fan Meeting", desc: "Opportunity for real encounters" },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Is OohX legal?",
          a: "Yes, OohX operates with the consent of all creators' likeness rights. We use deepfake technology ethically and provide fair compensation to creators.",
        },
        {
          q: "Is my personal information safe?",
          a: "Absolute privacy protection is OohX's core value. All data is encrypted and your activities are completely private.",
        },
        {
          q: "Is it only adult content?",
          a: "No, OohX also supports pure communication. Adult content is optional, and general conversations and fan interactions are also possible.",
        },
        {
          q: "How do I register as a creator?",
          a: "Registration is possible after going through the likeness rights consent process. Earn revenue from your image and get opportunities to meet your fans.",
        },
      ],
    },
    cta: {
      title: "Start Your Special Experience",
      subtitle: "Experience new relationships beyond the boundary of reality and virtual at OohX",
      start: "Start Now",
      startAuth: "Explore Creators",
      register: "Register as Creator",
    },
    footer: {
      tagline: "Where reality meets virtual",
      services: "Services",
      serviceItems: ["AI Partner", "Premium Content", "Fan Meeting"],
      creator: "Creator",
      creatorItems: ["Register", "Revenue Management", "Support"],
      legal: "Legal",
      legalItems: ["Terms of Service", "Privacy Policy", "Contact"],
      copyright: "© 2025 OohX.ai. All rights reserved. 18+ only.",
    },
  },
  zh: {
    nav: {
      features: "功能",
      creators: "创作者",
      faq: "常见问题",
      login: "登录",
      logout: "退出",
      start: "开始使用",
    },
    hero: {
      badge: "🔞 18+ 成人平台",
      title1: "专属于你的",
      title2: "特别AI伴侣",
      subtitle: "真实网红面孔与AI技术相遇\n创造如现实般的约会体验",
      cta: "立即开始",
      ctaAuth: "探索创作者",
      learnMore: "了解更多",
    },
    features: {
      title: "OohX特色功能",
      subtitle: "超越现实与虚拟边界的体验",
      items: [
        {
          title: "真实网红",
          desc: "以真实创作者肖像权打造的AI伴侣。真实面孔，完美的虚拟伴侣",
        },
        {
          title: "高级内容",
          desc: "视频、3D、语音通话等多种成人内容。可选择购买或租用",
        },
        {
          title: "私密约会",
          desc: "与专属AI伴侣的私人时光。完全保障隐私",
        },
      ],
      learnMore: "了解更多",
    },
    creatorsSection: {
      title: "OohX创作者",
      subtitle: "与真实网红共同创造的特别体验",
      viewAll: "查看所有创作者",
      viewProfile: "查看资料",
    },
    benefits: {
      title1: "为创作者提供",
      title2: "新的收益机会",
      desc: "用肖像权收益弥补因AI技术消失的工作机会。如果深度伪造技术已经在使用您的形象，现在由您来掌控并变现。",
      items: ["肖像权使用费定期收益", "安全透明的合同管理", "通过粉丝见面会获得额外收益"],
      cta: "注册成为创作者",
    },
    howItWorks: {
      title: "OohX如何运作？",
      steps: [
        { title: "选择资料", desc: "选择您喜欢的创作者" },
        { title: "创建AI伴侣", desc: "生成定制化AI伴侣" },
        { title: "私密约会", desc: "享受专属私人时光" },
        { title: "粉丝见面会", desc: "真实相遇的机会" },
      ],
    },
    faq: {
      title: "常见问题",
      items: [
        {
          q: "OohX合法吗？",
          a: "是的，OohX在所有创作者肖像权同意下运营。我们以道德方式使用深度伪造技术，并向创作者提供公平报酬。",
        },
        {
          q: "我的个人信息安全吗？",
          a: "绝对的隐私保护是OohX的核心价值。所有数据均经过加密，您的活动完全保密。",
        },
        {
          q: "只有成人内容吗？",
          a: "不，OohX也支持纯粹的交流。成人内容是可选的，也可以进行普通对话和粉丝互动。",
        },
        {
          q: "如何注册成为创作者？",
          a: "经过肖像权同意程序后即可注册。用您的形象创造收益，获得与粉丝见面的机会。",
        },
      ],
    },
    cta: {
      title: "开始您的特别体验",
      subtitle: "在OohX超越现实与虚拟的边界，体验新的关系",
      start: "立即开始",
      startAuth: "探索创作者",
      register: "注册成为创作者",
    },
    footer: {
      tagline: "现实与虚拟相遇之处",
      services: "服务",
      serviceItems: ["AI伴侣", "高级内容", "粉丝见面会"],
      creator: "创作者",
      creatorItems: ["注册", "收益管理", "支持"],
      legal: "法律",
      legalItems: ["服务条款", "隐私政策", "联系我们"],
      copyright: "© 2025 OohX.ai. 保留所有权利。仅限18岁以上。",
    },
  },
};

export type Translations = typeof translations.ko;

export function getTranslation(lang: Language): Translations {
  return translations[lang] as Translations;
}
