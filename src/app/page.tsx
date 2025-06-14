"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Globe } from "lucide-react";

interface ContentType {
  productName: string;
  productSubtitle: string;
  productDescription: string;
  productDetailedDescription: string;
  videoUrl: string;
  compatibilityText: string;
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
  productName: "LumiPro",
  productSubtitle:
    "LumiPro isn't just a diffuser, it's a revolution in dental photography. We've redefined light control with precision, and a design philosophy focused on professionals who demand excellence.",
  productDescription:
    "LumiPro is a light diffuser transforming harsh flash light into soft, balanced illumination enhancing the detail, color accuracy, and depth in every photo. Whether you're documenting for records, showcasing aesthetics, or building your brand, this tool gives you total control over your image.",
  productDetailedDescription:
    "LumiPro is a light diffuser transforming harsh flash light into soft, balanced illumination enhancing the detail, color accuracy, and depth in every photo.\n\nWhether you're documenting for records, showcasing aesthetics, or building your brand, this tool gives you total control over your image.",
  videoUrl:
    "https://www.youtube.com/watch?v=7sKfVjz3AkY&pp=ygUOZGVudGFsIGNvbnRlbnQ%3D",
  compatibilityText:
    "Seamless Compatibility: Tailored to integrate perfectly with top flash systems like the Godox MFR76 and Yongnuo YN14EX II.",
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
  "nav.product": { en: "Meet LumiPro", ar: "تعرف على لومي برو" },
  "nav.description": { en: "LumiPro Features", ar: "مميزات لومي برو" },
  "nav.video": { en: "Video", ar: "الفيديو" },
  "nav.photos": { en: "Photos", ar: "الصور" },
  "nav.compatibility": { en: "Compatibility", ar: "التوافق" },
  "hero.cta": { en: "Learn More", ar: "اعرف المزيد" },
  "product.title": { en: "Meet LumiPro", ar: "تعرف على لومي برو" },
  "description.title": { en: "LumiPro Features", ar: "مميزات لومي برو" },
  "video.title": { en: "Watch it in Action", ar: "شاهده في العمل" },
  "photos.title": { en: "Product Footage & Results", ar: "لقطات المنتج والنتائج" },
  "compatibility.title": { en: "Compatibility", ar: "التوافق" },
  "contact.whatsapp": {
    en: "Contact us on WhatsApp",
    ar: "تواصل معنا على واتساب",
  },
  "contact.whatsapp.tooltip": { en: "Chat with us", ar: "تواصل معنا" },
  // LumiPro specific features
  "product.feature.precision": { en: "Precision Diffusion", ar: "انتشار الضوء بدقة" },
  "product.feature.precision.desc": {
    en: "Customized light softness, designed by dentists, for dentists.",
    ar: "نعومة ضوء مخصصة، مصممة بواسطة أطباء الأسنان، لأطباء الأسنان.",
  },
  "product.feature.durable": { en: "Ultra-Durable Build", ar: "بناء فائق المتانة" },
  "product.feature.durable.desc": {
    en: "Manufactured using premium material optimized opacity to ensure perfect light scattering and long-term durability.",
    ar: "مُصنع باستخدام مواد ممتازة بشفافية محسنة لضمان تشتت مثالي للضوء ومتانة طويلة المدى.",
  },
  "product.feature.professional": { en: "Professional Results", ar: "نتائج احترافية" },
  "product.feature.professional.desc": {
    en: "Converts clinical lighting into studio-quality imaging—every shot, every time.",
    ar: "يحول الإضاءة السريرية إلى تصوير بجودة الاستوديو—في كل لقطة، في كل مرة.",
  },
  "product.feature.time": { en: "Your time is a priority", ar: "وقتك أولوية" },
  "product.feature.time.desc": {
    en: "Designed to save time and improve workflow.",
    ar: "مصمم لتوفير الوقت وتحسين سير العمل.",
  },
  "product.premium": { en: "Premium Quality", ar: "جودة ممتازة" },
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
  "footer.quicklinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.contact": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.contact.question": {
    en: "Have questions about our product? Contact us via WhatsApp.",
    ar: "هل لديك أسئلة حول منتجنا؟ اتصل بنا عبر واتساب.",
  },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "product.view": { en: "View", ar: "عرض" },
  "product.buynow": { en: "Buy Now", ar: "اشتري الآن" },
  "feedbacks.title": { en: "What Dentists Are Saying", ar: "ماذا يقول أطباء الأسنان" },
};

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Add this useEffect for smooth scrolling
  useEffect(() => {
    // Set smooth scrolling behavior for the entire document
    document.documentElement.style.scrollBehavior = "smooth";

    // Optional: Clean up when component unmounts
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
    { id: "feedbacks", label: t("feedbacks.title"), href: "#feedbacks" },
    { id: "photos", label: t("nav.photos"), href: "#photos" },
    { id: "compatibility", label: t("nav.compatibility"), href: "#compatibility" },
  ];

  const platforms = [
    {
      name: "Godox MFR76",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      name: "Yongnuo YN14EX II",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      name: "Canon Flash",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Nikon Flash",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Update your navigation item click handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu if open
      setMobileMenuOpen(false);

      // Add a small delay for mobile menu to close
      setTimeout(() => {
        const headerOffset = 80; // Adjust based on your header height
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
    <div className={`min-h-screen ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Navigation */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
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
              width={150}
              height={50}
              className="h-8 md:h-10"
            />
          </a>
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`transition-colors duration-300 hover:text-orange-500 ${
                  activeSection === item.id ? "text-orange-500" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="relative group">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                className="text-white hover:text-orange-500 transition-all duration-300 px-4 py-2 flex items-center gap-2"
              >
                <Globe className="h-5 w-5" />
                <span>{language === "en" ? "عربي" : "English"}</span>
              </Button>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </div>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
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
            <div className="container mx-auto px-6 md:px-8 flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`transition-colors duration-300 hover:text-orange-500 ${
                    activeSection === item.id ? "text-orange-500" : "text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="relative">
                <Button
                  onClick={toggleLanguage}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-orange-500 transition-all duration-300 justify-start items-center w-full px-3 py-2"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{language === "en" ? "عربي" : "English"}</span>
                </Button>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 hover:w-full transition-all duration-300 ease-in-out"></span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            {content.productName}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto">
            {content.productSubtitle}
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
            onClick={() => scrollToSection("video")}
          >
            {t("hero.cta")}
          </Button>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="text-white rounded-full"
              onClick={() => scrollToSection("video")}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
            {t("video.title")}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={content.videoUrl.includes('youtube.com') || content.videoUrl.includes('youtu.be') 
                  ? content.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]
                  : content.videoUrl}
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

      {/* Product Section */}
      <section id="product" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-white">
            {t("product.title")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
                {content.productDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">{t("product.feature.precision")}</h3>
                    <p className="text-xs text-gray-600">{t("product.feature.precision.desc")}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.durable")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.durable.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.professional")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.professional.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.time")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.time.desc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 relative">
                <Image
                  src={content.photos[0] || "https://source.unsplash.com/random/400x500/?product"}
                  alt="Product"
                  width={400}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white text-lg font-bold">{content.productName}</h3>
                  <p className="text-gray-200 text-sm">{t("product.premium")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Continue with product description */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8">
              <p className="text-xl text-gray-200 leading-relaxed whitespace-pre-line text-center">
                {content.productDetailedDescription}
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">{t("product.feature.precision")}</h3>
                    <p className="text-xs text-gray-600">{t("product.feature.precision.desc")}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.durable")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.durable.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.professional")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.professional.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-orange-500 mb-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm mb-1">
                      {t("product.feature.time")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("product.feature.time.desc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Buy Now Button */}
              <div className="mt-12 text-center">
                <a
                  href={`https://wa.me/${content.whatsappNumber}?text=I'm interested in LumiPro dental photography diffuser`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t("product.buynow")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedbacks Section */}
      <section id="feedbacks" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
            {t("feedbacks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Feedback 1 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">AH</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Dr. Ahmed Hassan</h3>
                  <p className="text-gray-400 text-sm">Cosmetic Dentist</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic">
                "LumiPro has completely transformed my dental photography. The precision and control it offers is unmatched. My patients love seeing their results in such clear, professional images."
              </p>
            </div>

            {/* Feedback 2 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">SM</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Dr. Sarah Mohamed</h3>
                  <p className="text-gray-400 text-sm">Orthodontist</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic">
                "The three diffusion patterns give me incredible flexibility. Whether I'm documenting orthodontic progress or showcasing final results, LumiPro delivers studio-quality images every time."
              </p>
            </div>

            {/* Feedback 3 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">KA</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Dr. Khaled Ali</h3>
                  <p className="text-gray-400 text-sm">Oral Surgeon</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic">
                "As a professional who demands excellence, LumiPro exceeds my expectations. The build quality is exceptional and it saves me significant time in my workflow. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
            {t("photos.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {content.photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={photo}
                  alt={`Product photo ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-lg font-semibold">
                    {`${content.productName} - ${t("product.view")} ${
                      index + 1
                    }`}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section id="compatibility" className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
            {t("compatibility.title")}
          </h2>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-8 border border-orange-500">
              <p className="text-lg mb-8 text-center text-gray-200">
                {content.compatibilityText}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-orange-500 p-4 rounded-full shadow-md text-white mb-3">
                      {platform.icon}
                    </div>
                    <span className="font-semibold text-white">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <a
          href={`https://wa.me/${content.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:pr-4"
          aria-label="WhatsApp"
          title={t("contact.whatsapp")}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M20.473 3.527C18.192 1.247 15.198 0 12.007 0c-6.583 0-11.94 5.356-11.94 11.94a11.91 11.91 0 001.592 5.98L0 24l6.193-1.624a11.91 11.91 0 005.738 1.464h.005c6.583 0 11.94-5.356 11.94-11.94 0-3.196-1.245-6.194-3.403-8.373zm-8.466 18.36h-.004a9.884 9.884 0 01-5.045-1.383l-.36-.216-3.744.982.999-3.648-.237-.378a9.92 9.92 0 01-1.514-5.296c0-5.473 4.454-9.928 9.932-9.928a9.87 9.87 0 017.029 2.91 9.87 9.87 0 012.91 7.028c0 5.472-4.455 9.928-9.966 9.928zm5.442-7.442c-.3-.15-1.773-.874-2.048-.973-.275-.099-.475-.149-.676.15-.2.299-.774.973-.95 1.174-.175.201-.35.225-.65.075-.3-.15-1.266-.467-2.414-1.486-.891-.794-1.5-1.775-1.676-2.074-.175-.299-.019-.46.132-.608.135-.133.3-.347.45-.521.15-.174.2-.298.3-.497.1-.2.05-.374-.025-.523-.075-.149-.675-1.629-.927-2.23-.243-.584-.49-.5-.675-.51-.174-.008-.375-.01-.575-.01-.2 0-.524.074-.8.373-.275.299-1.05 1.024-1.05 2.498 0 1.474 1.075 2.898 1.225 3.097.15.2 2.125 3.248 5.14 4.553.718.31 1.28.495 1.718.636.722.225 1.379.194 1.896.118.578-.087 1.778-.727 2.03-1.43.25-.703.25-1.304.175-1.43-.075-.125-.275-.2-.575-.35z"
              clipRule="evenodd"
            />
          </svg>
          <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out">
            {t("contact.whatsapp.tooltip")}
          </span>
        </a>
        <div className="absolute -top-10 right-0 bg-black/75 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {t("contact.whatsapp")}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <Image
                src={content.logoUrl}
                alt="Logo"
                width={150}
                height={50}
                className="h-10 mb-4"
              />
              <p className="text-gray-400">{content.productDescription}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {t("footer.quicklinks")}
              </h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.contact")}</h3>
              <p className="text-gray-400 mb-4">
                {t("footer.contact.question")}
              </p>
              <a
                href={`https://wa.me/${content.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors w-fit"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.473 3.527C18.192 1.247 15.198 0 12.007 0c-6.583 0-11.94 5.356-11.94 11.94a11.91 11.91 0 001.592 5.98L0 24l6.193-1.624a11.91 11.91 0 005.738 1.464h.005c6.583 0 11.94-5.356 11.94-11.94 0-3.196-1.245-6.194-3.403-8.373zm-8.466 18.36h-.004a9.884 9.884 0 01-5.045-1.383l-.36-.216-3.744.982.999-3.648-.237-.378a9.92 9.92 0 01-1.514-5.296c0-5.473 4.454-9.928 9.932-9.928a9.87 9.87 0 017.029 2.91 9.87 9.87 0 012.91 7.028c0 5.472-4.455 9.928-9.966 9.928zm5.442-7.442c-.3-.15-1.773-.874-2.048-.973-.275-.099-.475-.149-.676.15-.2.299-.774.973-.95 1.174-.175.201-.35.225-.65.075-.3-.15-1.266-.467-2.414-1.486-.891-.794-1.5-1.775-1.676-2.074-.175-.299-.019-.46.132-.608.135-.133.3-.347.45-.521.15-.174.2-.298.3-.497.1-.2.05-.374-.025-.523-.075-.149-.675-1.629-.927-2.23-.243-.584-.49-.5-.675-.51-.174-.008-.375-.01-.575-.01-.2 0-.524.074-.8.373-.275.299-1.05 1.024-1.05 2.498 0 1.474 1.075 2.898 1.225 3.097.15.2 2.125 3.248 5.14 4.553.718.31 1.28.495 1.718.636.722.225 1.379.194 1.896.118.578-.087 1.778-.727 2.03-1.43.25-.703.25-1.304.175-1.43-.075-.125-.275-.2-.575-.35z" />
                </svg>
                {t("contact.whatsapp")}
              </a>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} {content.productName}.{" "}
              {t("footer.rights")}
            </p>
            <div className="mt-2 flex justify-center space-x-4">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded ${
                  language === "en"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-2 py-1 rounded ${
                  language === "ar"
                    ? "bg-orange-500 text-white"
                    : "text-gray-400"
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
