"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Globe } from "lucide-react";

interface ContentType {
  videoUrl: string;
  whatsappNumber: string;
  photos: string[];
  logoUrl: string;
}

interface TranslationsType {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const defaultContent: ContentType = {
  videoUrl:
    "https://www.youtube.com/watch?v=7sKfVjz3AkY&pp=ygUOZGVudGFsIGNvbnRlbnQ%3D",
  whatsappNumber: "+201093044708",
  photos: [
    "/DSC_0310-2.jpg",
    "/DSC_0374.jpg",
    "/DSC_0310-2.jpg",
    "/DSC_0374.jpg",
  ],
  logoUrl: "/DSC_0310-2.jpg",
};

const translations: TranslationsType = {
  // Navigation
  "nav.product": { en: "Meet LumiPro", ar: "تعرف على لومي برو" },
  "nav.description": { en: "LumiPro Features", ar: "مميزات لومي برو" },
  "nav.video": { en: "Video", ar: "الفيديو" },
  "nav.photos": { en: "Photos", ar: "الصور" },
  "nav.compatibility": { en: "Compatibility", ar: "التوافق" },

  // Hero Section
  "hero.cta": { en: "Learn More", ar: "اعرف المزيد" },

  // Product Section - Core Content
  "product.name": { en: "LumiPro", ar: "لومي برو" },
  "product.title": { en: "Meet LumiPro", ar: "تعرف على لومي برو" },
  "product.description": {
    en: "LumiPro isn't just a diffuser, it's a revolution in dental photography. We've redefined light control with precision, and a design philosophy focused on professionals who demand excellence.",
    ar: "لومي برو ليس مجرد موزع للضوء، إنه ثورة في تصوير الأسنان. لقد أعدنا تعريف التحكم في الضوء بدقة، وفلسفة تصميم تركز على المهنيين الذين يطالبون بالتميز.",
  },
  "product.detailed.description": {
    en: "LumiPro is a light diffuser transforming harsh flash light into soft, balanced illumination enhancing the detail, color accuracy, and depth in every photo.\n\nWhether you're documenting for records, showcasing aesthetics, or building your brand, this tool gives you total control over your image.",
    ar: "لومي برو هو موزع للضوء يحول الفلاش القاسي إلى إضاءة ناعمة ومتوازنة تعزز التفاصيل ودقة الألوان والعمق في كل صورة.\n\nسواء كنت توثق للسجلات، أو تعرض الجماليات، أو تبني علامتك التجارية، فإن هذه الأداة تمنحك السيطرة الكاملة على صورتك.",
  },
  "product.premium": { en: "Premium Quality", ar: "جودة ممتازة" },
  "product.view": { en: "View", ar: "عرض" },
  "product.buynow": { en: "Buy Now", ar: "اشتري الآن" },

  // Product Features
  "product.feature.precision": {
    en: "Precision Diffusion",
    ar: "انتشار الضوء بدقة",
  },
  "product.feature.precision.desc": {
    en: "Customized light softness, designed by dentists, for dentists.",
    ar: "نعومة ضوء مخصصة، مصممة بواسطة أطباء الأسنان، لأطباء الأسنان.",
  },
  "product.feature.durable": {
    en: "Ultra-Durable Build",
    ar: "بناء فائق المتانة",
  },
  "product.feature.durable.desc": {
    en: "Manufactured using premium material optimized opacity to ensure perfect light scattering and long-term durability.",
    ar: "مُصنع باستخدام مواد ممتازة بشفافية محسنة لضمان تشتت مثالي للضوء ومتانة طويلة المدى.",
  },
  "product.feature.professional": {
    en: "Professional Results",
    ar: "نتائج احترافية",
  },
  "product.feature.professional.desc": {
    en: "Converts clinical lighting into studio-quality imaging—every shot, every time.",
    ar: "يحول الإضاءة السريرية إلى تصوير بجودة الاستوديو—في كل لقطة، في كل مرة.",
  },
  "product.feature.time": { en: "Your time is a priority", ar: "وقتك أولوية" },
  "product.feature.time.desc": {
    en: "Designed to save time and improve workflow.",
    ar: "مصمم لتوفير الوقت وتحسين سير العمل.",
  },

  // Description Features
  "description.title": { en: "LumiPro Features", ar: "مميزات لومي برو" },
  "description.feature.technology": {
    en: "Innovative Technology",
    ar: "تقنية مبتكرة",
  },
  "description.feature.technology.desc": {
    en: "Engineered with layered diffusion, 3 different patterns for diffusion, you can totally choose the amount of diffusion, pattern and shape. Giving you full control over your image.",
    ar: "مهندس بانتشار متدرج، 3 أنماط مختلفة للانتشار، يمكنك اختيار كمية الانتشار والنمط والشكل بالكامل. يمنحك السيطرة الكاملة على صورتك.",
  },
  "description.feature.design": { en: "Sleek & Efficient", ar: "أنيق وفعال" },
  "description.feature.design.desc": {
    en: "Lightweight yet stable, crafted to complement your precision work without compromise.",
    ar: "خفيف الوزن لكن مستقر، مصنوع ليكمل عملك الدقيق بدون تنازل.",
  },
  "description.feature.authority": {
    en: "Authoritative Design",
    ar: "تصميم معتمد",
  },
  "description.feature.authority.desc": {
    en: "Developed by leaders in dental photography, trusted by experts across the field.",
    ar: "طُور بواسطة رواد في تصوير الأسنان، موثوق به من قبل الخبراء في المجال.",
  },
  "description.feature.compatibility": {
    en: "Seamless Compatibility",
    ar: "توافق سلس",
  },
  "description.feature.compatibility.desc": {
    en: "Tailored to integrate perfectly with top flash systems like the Godox MFR76 and Yongnuo YN14EX II.",
    ar: "مصمم للتكامل المثالي مع أنظمة الفلاش الأفضل مثل Godox MFR76 و Yongnuo YN14EX II.",
  },

  // Video Section
  "video.title": { en: "Watch it in Action", ar: "شاهده في العمل" },

  // Photos Section
  "photos.title": {
    en: "Product Footage & Results",
    ar: "لقطات المنتج والنتائج",
  },

  // Compatibility Section
  "compatibility.title": { en: "Compatibility", ar: "التوافق" },
  "compatibility.text": {
    en: "Seamless Compatibility: Tailored to integrate perfectly with top flash systems like the Godox MFR76 and Yongnuo YN14EX II.",
    ar: "توافق سلس: مصمم للتكامل المثالي مع أنظمة الفلاش الأفضل مثل Godox MFR76 و Yongnuo YN14EX II.",
  },

  // Contact & WhatsApp
  "contact.whatsapp": {
    en: "Contact us on WhatsApp",
    ar: "تواصل معنا على واتساب",
  },
  "contact.whatsapp.tooltip": { en: "Chat with us", ar: "تواصل معنا" },

  // Feedbacks Section
  "feedbacks.title": {
    en: "What Dentists Are Saying",
    ar: "ماذا يقول أطباء الأسنان",
  },
  "feedbacks.doctor1.name": { en: "Dr. Ahmed Hassan", ar: "د. أحمد حسن" },
  "feedbacks.doctor1.title": { en: "Cosmetic Dentist", ar: "طبيب أسنان تجميلي" },
  "feedbacks.doctor1.quote": {
    en: "“LumiPro has completely transformed my dental photography. The precision and control it offers is unmatched. My patients love seeing their results in such clear, professional images.”",
    ar: "“لقد غيّر لومي برو تصوير الأسنان الخاص بي تمامًا. الدقة والتحكم الذي يوفره لا مثيل لهما. يحب مرضاي رؤية نتائجهم بهذه الصور الواضحة والاحترافية.”",
  },
  "feedbacks.doctor2.name": { en: "Dr. Sarah Mohamed", ar: "د. سارة محمد" },
  "feedbacks.doctor2.title": { en: "Orthodontist", ar: "أخصائية تقويم أسنان" },
  "feedbacks.doctor2.quote": {
    en: "“The three diffusion patterns give me incredible flexibility. Whether I'm documenting orthodontic progress or showcasing final results, LumiPro delivers studio-quality images every time.”",
    ar: "“توفر لي أنماط الانتشار الثلاثة مرونة لا تصدق. سواء كنت أوثق تقدم تقويم الأسنان أو أعرض النتائج النهائية، يقدم لومي برو صورًا بجودة الاستوديو في كل مرة.”",
  },
  "feedbacks.doctor3.name": { en: "Dr. Khaled Ali", ar: "د. خالد علي" },
  "feedbacks.doctor3.title": { en: "Oral Surgeon", ar: "جراح فم" },
  "feedbacks.doctor3.quote": {
    en: "“As a professional who demands excellence, LumiPro exceeds my expectations. The build quality is exceptional and it saves me significant time in my workflow. Highly recommended!”",
    ar: "“كمحترف يطلب التميز، يتجاوز لومي برو توقعاتي. جودة البناء استثنائية ويوفر لي وقتًا كبيرًا في سير عملي. موصى به للغاية!”",
  },

  // Footer
  "footer.quicklinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.contact": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.contact.question": {
    en: "Have questions about our product? Contact us via WhatsApp.",
    ar: "هل لديك أسئلة حول منتجنا؟ اتصل بنا عبر واتساب.",
  },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.description": {
    en: "LumiPro isn't just a diffuser, it's a revolution in dental photography. We've redefined light control with precision, and a design philosophy focused on professionals who demand excellence.",
    ar: "لومي برو ليس مجرد موزع للضوء، إنه ثورة في تصوير الأسنان. لقد أعدنا تعريف التحكم في الضوء بدقة، وفلسفة تصميم تركز على المهنيين الذين يطالبون بالتميز.",
  },
};

export default function Home() {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string): string => translations[key]?.[language] || key;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const navItems = [
    { id: "video", label: t("nav.video"), href: "#video" },
    { id: "product", label: t("nav.product"), href: "#product" },
    { id: "description", label: t("nav.description"), href: "#description" },
    { id: "feedbacks", label: t("feedbacks.title"), href: "#feedbacks" },
    { id: "photos", label: t("nav.photos"), href: "#photos" },
    {
      id: "compatibility",
      label: t("nav.compatibility"),
      href: "#compatibility",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 10);
    }
  };

  return (
    <div className={`min-h-screen ${language === "ar" ? "rtl" : "ltr"} bg-black font-sans`}>
      {/* Navigation */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <a
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            href="#"
            className="flex items-center"
          >
            <Image
              src={content.logoUrl}
              alt="Logo"
              width={120}
              height={40}
              className="h-8"
            />
          </a>
          <nav className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-orange-400 ${
                  activeSection === item.id ? "text-orange-400" : "text-gray-200"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              className="text-gray-200 hover:text-orange-400 transition-all duration-300 px-3 py-2 flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "عربي" : "English"}</span>
            </Button>
          </nav>
          <button
            className="md:hidden text-gray-200 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 py-4">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-orange-400 ${
                    activeSection === item.id ? "text-orange-400" : "text-gray-200"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-gray-200 hover:text-orange-400 transition-all duration-300 justify-start items-center w-full px-3 py-2"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span>{language === "en" ? "عربي" : "English"}</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Video Section */}
      <section id="video" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
            {t("video.title")}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={
                  content.videoUrl.includes("youtube.com") ||
                  content.videoUrl.includes("youtu.be")
                    ? content.videoUrl
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "youtube.com/embed/")
                        .split("&")[0]
                    : content.videoUrl
                }
                title="LumiPro Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-black flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <h1 className="text-7xl sm:text-9xl lg:text-10xl font-bold mb-6 text-white">
            {t("product.name")}
          </h1>
          <Button
            size="lg"
            className="bg-orange-400 hover:bg-orange-500 text-white px-10 py-3 rounded-full"
            onClick={() => scrollToSection("product")}
          >
            {t("hero.cta")}
          </Button>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="text-white rounded-full"
              onClick={() => scrollToSection("product")}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
            {t("product.title")}
          </h2>
          <div className="flex flex-col items-center">
            <div className={`text-center max-w-3xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <p className="text-lg sm:text-xl mb-8 text-gray-200 leading-relaxed">
                {t("product.description")}
              </p>
            </div>
            <div className="mt-10 max-w-4xl mx-auto w-full">
              <div className="bg-black rounded-lg p-6">
                <div className="space-y-8">
                  {/* Feature: Precision Diffusion */}
                  <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                    <div className="flex-shrink-0 text-orange-400 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {t("product.feature.precision")}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t("product.feature.precision.desc")}
                      </p>
                    </div>
                  </div>

                  {/* Feature: Ultra-Durable Build */}
                  <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                    <div className="flex-shrink-0 text-orange-400 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {t("product.feature.durable")}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t("product.feature.durable.desc")}
                      </p>
                    </div>
                  </div>

                  {/* Feature: Professional Results */}
                  <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                    <div className="flex-shrink-0 text-orange-400 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {t("product.feature.professional")}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t("product.feature.professional.desc")}
                      </p>
                    </div>
                  </div>

                  {/* Feature: Your time is a priority */}
                  <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                    <div className="flex-shrink-0 text-orange-400 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {t("product.feature.time")}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t("product.feature.time.desc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 max-w-sm mx-auto">
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={
                        content.photos[0] ||
                        "https://source.unsplash.com/random/300x400/?product"
                      }
                      alt="Product"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-lg font-semibold">
                        {t("product.name")}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {t("product.premium")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description Section */}
              <section id="description" className="py-16 bg-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
                    {t("description.title")}
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line text-center max-w-3xl mx-auto">
                    {t("product.detailed.description")}
                  </p>
                  <div className="mt-12 space-y-8 max-w-3xl mx-auto"> {/* Changed from grid to space-y */}
                    {/* Feature 1: Innovative Technology */}
                    <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'} space-x-4`}>
                      <div className="flex-shrink-0 text-orange-400 mt-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                          {t("description.feature.technology")}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t("description.feature.technology.desc")}
                        </p>
                      </div>
                    </div>

                    {/* Feature 2: Sleek & Efficient */}
                    <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'} space-x-4`}>
                      <div className="flex-shrink-0 text-orange-400 mt-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                          {t("description.feature.design")}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t("description.feature.design.desc")}
                        </p>
                      </div>
                    </div>

                    {/* Feature 3: Authoritative Design */}
                    <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'} space-x-4`}>
                      <div className="flex-shrink-0 text-orange-400 mt-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                          {t("description.feature.authority")}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t("description.feature.authority.desc")}
                        </p>
                      </div>
                    </div>

                    {/* Feature 4: Seamless Compatibility */}
                    <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'} space-x-4`}>
                      <div className="flex-shrink-0 text-orange-400 mt-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-1">
                          {t("description.feature.compatibility")}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {t("description.feature.compatibility.desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

                    {/* Feedbacks Section */}
      <section id="feedbacks" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
            {t("feedbacks.title")}
          </h2>
          <div className="space-y-10 max-w-3xl mx-auto">
            {/* Feedback 1: Dr. Ahmed Hassan */}
            <div>
              <div className={`flex items-center mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                  <span className="text-white font-semibold text-sm">AH</span>
                </div>
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-gray-100 font-semibold text-base">{t("feedbacks.doctor1.name")}</h3>
                  <p className="text-gray-300 text-sm">{t("feedbacks.doctor1.title")}</p>
                </div>
              </div>
              <div className={`flex mb-2 ${language === 'ar' ? 'pr-13 justify-end' : 'pl-13 justify-start'}`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400 mr-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`text-gray-300 text-sm italic leading-relaxed ${language === 'ar' ? 'pr-13 text-right' : 'pl-13 text-left'}`}>
                {t("feedbacks.doctor1.quote")}
              </p>
            </div>

            {/* Feedback 2: Dr. Sarah Mohamed */}
            <div>
              <div className={`flex items-center mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                  <span className="text-white font-semibold text-sm">SM</span>
                </div>
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-gray-100 font-semibold text-base">{t("feedbacks.doctor2.name")}</h3>
                  <p className="text-gray-300 text-sm">{t("feedbacks.doctor2.title")}</p>
                </div>
              </div>
              <div className={`flex mb-2 ${language === 'ar' ? 'pr-13 justify-end' : 'pl-13 justify-start'}`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400 mr-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`text-gray-300 text-sm italic leading-relaxed ${language === 'ar' ? 'pr-13 text-right' : 'pl-13 text-left'}`}>
                {t("feedbacks.doctor2.quote")}
              </p>
            </div>

            {/* Feedback 3: Dr. Khaled Ali */}
            <div>
              <div className={`flex items-center mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                  <span className="text-white font-semibold text-sm">KA</span>
                </div>
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-gray-100 font-semibold text-base">{t("feedbacks.doctor3.name")}</h3>
                  <p className="text-gray-300 text-sm">{t("feedbacks.doctor3.title")}</p>
                </div>
              </div>
              <div className={`flex mb-2 ${language === 'ar' ? 'pr-13 justify-end' : 'pl-13 justify-start'}`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400 mr-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`text-gray-300 text-sm italic leading-relaxed ${language === 'ar' ? 'pr-13 text-right' : 'pl-13 text-left'}`}>
                {t("feedbacks.doctor3.quote")}
              </p>
            </div>
          </div>
        </div>
      </section>
                    <div className="mt-10 text-center">
                <a
                  href={`https://wa.me/${content.whatsappNumber}?text=I'm interested in LumiPro dental photography diffuser`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {t("product.buynow")}
                </a>
              </div>
              {/* Photos Section */}
              <section id="photos" className="py-16 bg-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
                    {t("photos.title")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <Image
                          src={photo}
                          alt={`Product photo ${index + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <h3 className="text-white text-base font-semibold">
                            {`${t("product.name")} - ${t("product.view")} ${
                              index + 1
                            }`}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Buy Now Button */}
              <div className="mt-10 text-center">
                <a
                  href={`https://wa.me/${content.whatsappNumber}?text=I'm interested in LumiPro dental photography diffuser`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {t("product.buynow")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50 group">
        <a
          href={`https://wa.me/${content.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full shadow-md transition-all duration-300 group-hover:scale-105 group-hover:pr-3"
          aria-label="WhatsApp"
          title={t("contact.whatsapp")}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M20.473 3.527C18.192 1.247 15.198 0 12.007 0c-6.583 0-11.94 5.356-11.94 11.94a11.91 11.91 0 001.592 5.98L0 24l6.193-1.624a11.91 11.91 0 005.738 1.464h.005c6.583 0 11.94-5.356 11.94-11.94 0-3.196-1.245-6.194-3.403-8.373zm-8.466 18.36h-.004a9.884 9.884 0 01-5.045-1.383l-.36-.216-3.744.982.999-3.648-.237-.378a9.92 9.92 0 01-1.514-5.296c0-5.473 4.454-9.928 9.932-9.928a9.87 9.87 0 017.029 2.91 9.87 9.87 0 012.91 7.028c0 5.472-4.455 9.928-9.966 9.928zm5.442-7.442c-.3-.15-1.773-.874-2.048-.973-.275-.099-.475-.149-.676.15-.2.299-.774.973-.95 1.174-.175.201-.35.225-.65.075-.3-.15-1.266-.467-2.414-1.486-.891-.794-1.5-1.775-1.676-2.074-.175-.299-.019-.46.132-.608.135-.133.3-.347.45-.521.15-.174.2-.298.3-.497.1-.2.05-.374-.025-.523-.075-.149-.675-1.629-.927-2.23-.243-.584-.49-.5-.675-.51-.174-.008-.375-.01-.575-.01-.2 0-.524.074-.8.373-.275.299-1.05 1.024-1.05 2.498 0 1.474 1.075 2.898 1.225 3.097.15.2 2.125 3.248 5.14 4.553.718.31 1.28.495 1.718.636.722.225 1.379.194 1.896.118.578-.087 1.778-.727 2.03-1.43.25-.703.25-1.304.175-1.43-.075-.125-.275-.2-.575-.35z"
              clipRule="evenodd"
            />
          </svg>
          <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm">
            {t("contact.whatsapp.tooltip")}
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-200 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Image
                src={content.logoUrl}
                alt="Logo"
                width={120}
                height={40}
                className="h-8 mb-4"
              />
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("footer.description")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.quicklinks")}</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {t("footer.contact.question")}
              </p>
              <a
                href={`https://wa.me/${content.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors w-fit text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.473 3.527C18.192 1.247 15.198 0 12.007 0c-6.583 0-11.94 5.356-11.94 11.94a11.91 11.91 0 001.592 5.98L0 24l6.193-1.624a11.91 11.91 0 005.738 1.464h.005c6.583 0 11.94-5.356 11.94-11.94 0-3.196-1.245-6.194-3.403-8.373zm-8.466 18.36h-.004a9.884 9.884 0 01-5.045-1.383l-.36-.216-3.744.982.999-3.648-.237-.378a9.92 9.92 0 01-1.514-5.296c0-5.473 4.454-9.928 9.932-9.928a9.87 9.87 0 017.029 2.91 9.87 9.87 0 012.91 7.028c0 5.472-4.455 9.928-9.966 9.928zm5.442-7.442c-.3-.15-1.773-.874-2.048-.973-.275-.099-.475-.149-.676.15-.2.299-.774.973-.95 1.174-.175.201-.35.225-.65.075-.3-.15-1.266-.467-2.414-1.486-.891-.794-1.5-1.775-1.676-2.074-.175-.299-.019-.46.132-.608.135-.133.3-.347.45-.521.15-.174.2-.298.3-.497.1-.2.05-.374-.025-.523-.075-.149-.675-1.629-.927-2.23-.243-.584-.49-.5-.675-.51-.174-.008-.375-.01-.575-.01-.2 0-.524.074-.8.373-.275.299-1.05 1.024-1.05 2.498 0 1.474 1.075 2.898 1.225 3.097.15.2 2.125 3.248 5.14 4.553.718.31 1.28.495 1.718.636.722.225 1.379.194 1.896.118.578-.087 1.778-.727 2.03-1.43.25-.703.25-1.304.175-1.43-.075-.125-.275-.2-.575-.35z" />
                </svg>
                {t("contact.whatsapp")}
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} {t("product.name")}. {t("footer.rights")}
            </p>
            <div className="mt-3 flex justify-center space-x-3">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded text-sm ${
                  language === "en"
                    ? "bg-orange-400 text-white"
                    : "text-gray-400 hover:text-orange-400"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 rounded text-sm ${
                  language === "ar"
                    ? "bg-orange-400 text-white"
                    : "text-gray-400 hover:text-orange-400"
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
