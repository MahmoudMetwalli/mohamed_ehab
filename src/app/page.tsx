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
  productName: "Amazing Product",
  productSubtitle:
    "Discover the revolutionary product that will change your life",
  productDescription:
    "Our innovative product combines cutting-edge technology with sleek design to bring you the ultimate experience.",
  productDetailedDescription:
    "This amazing product features high-quality materials, innovative technology, and a user-friendly design. It is perfect for everyday use and will make your life easier and more enjoyable.",
  videoUrl:
    "https://www.youtube.com/watch?v=7sKfVjz3AkY&pp=ygUOZGVudGFsIGNvbnRlbnQ%3D",
  compatibilityText:
    "Our product is compatible with iOS, Android, Windows, and MacOS platforms.",
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
  "nav.product": { en: "Meet the Product", ar: "تعرف على المنتج" },
  "nav.description": { en: "Description", ar: "الوصف" },
  "nav.video": { en: "Video", ar: "الفيديو" },
  "nav.photos": { en: "Photos", ar: "الصور" },
  "nav.compatibility": { en: "Compatibility", ar: "التوافق" },
  "hero.cta": { en: "Learn More", ar: "اعرف المزيد" },
  "product.title": { en: "Meet the Product", ar: "تعرف على المنتج" },
  "description.title": { en: "Product Description", ar: "وصف المنتج" },
  "video.title": { en: "Watch it in Action", ar: "شاهده في العمل" },
  "photos.title": { en: "Product Photos", ar: "صور المنتج" },
  "compatibility.title": { en: "Compatibility", ar: "التوافق" },
  "contact.whatsapp": {
    en: "Contact us on WhatsApp",
    ar: "تواصل معنا على واتساب",
  },
  "contact.whatsapp.tooltip": { en: "Chat with us", ar: "تواصل معنا" },
  // Add missing translations below
  "product.feature.fast": { en: "Fast", ar: "سريع" },
  "product.feature.fast.desc": {
    en: "Lightning quick performance",
    ar: "أداء سريع كالبرق",
  },
  "product.feature.friendly": { en: "User Friendly", ar: "سهل الاستخدام" },
  "product.feature.friendly.desc": {
    en: "Intuitive for all users",
    ar: "بديهي لجميع المستخدمين",
  },
  "product.feature.customizable": { en: "Customizable", ar: "قابل للتخصيص" },
  "product.feature.customizable.desc": {
    en: "Adapt to your needs",
    ar: "يتكيف مع احتياجاتك",
  },
  "product.feature.reliable": { en: "Reliable", ar: "موثوق" },
  "product.feature.reliable.desc": {
    en: "Consistent performance",
    ar: "أداء متسق",
  },
  "product.premium": { en: "Premium Quality", ar: "جودة ممتازة" },
  "description.feature.performance": {
    en: "High Performance",
    ar: "أداء عالي",
  },
  "description.feature.performance.desc": {
    en: "Engineered for optimal performance in all conditions",
    ar: "مصممة للأداء الأمثل في جميع الظروف",
  },
  "description.feature.design": { en: "Thoughtful Design", ar: "تصميم مدروس" },
  "description.feature.design.desc": {
    en: "Carefully crafted with user experience in mind",
    ar: "مصنوع بعناية مع مراعاة تجربة المستخدم",
  },
  "description.feature.materials": {
    en: "Quality Materials",
    ar: "مواد عالية الجودة",
  },
  "description.feature.materials.desc": {
    en: "Made with premium quality materials built to last",
    ar: "مصنوعة من مواد عالية الجودة مصممة لتدوم",
  },
  "footer.quicklinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.contact": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.contact.question": {
    en: "Have questions about our product? Contact us via WhatsApp.",
    ar: "هل لديك أسئلة حول منتجنا؟ اتصل بنا عبر واتساب.",
  },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "product.view": { en: "View", ar: "عرض" },
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
    { id: "product", label: t("nav.product"), href: "#product" },
    { id: "description", label: t("nav.description"), href: "#description" },
    { id: "photos", label: t("nav.photos"), href: "#photos" },
    {
      id: "compatibility",
      label: t("nav.compatibility"),
      href: "#compatibility",
    },
  ];

  const platforms = [
    {
      name: "iOS",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
        </svg>
      ),
    },
    {
      name: "Android",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52M7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5m10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5" />
        </svg>
      ),
    },
    {
      name: "Windows",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "MacOS",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 3.83c-2.94 0-5.35 2.35-5.35 5.24 0 2.83 2.3 5.17 5.35 5.17 3.05 0 5.35-2.34 5.35-5.17 0-2.89-2.41-5.24-5.35-5.24zm0 2.62c1.47 0 2.67 1.17 2.67 2.62 0 1.41-1.2 2.58-2.67 2.58-1.47 0-2.67-1.17-2.67-2.58 0-1.45 1.2-2.62 2.67-2.62z" />
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
            onClick={() => scrollToSection("product")}
          >
            {t("hero.cta")}
          </Button>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="text-white rounded-full"
              onClick={() => scrollToSection("product")}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            {t("product.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-6">{content.productDescription}</p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-orange-500 mb-2">
                      <svg
                        className="w-8 h-8"
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
                    <h3 className="font-bold">{t("product.feature.fast")}</h3>
                    <p className="text-sm text-gray-600">
                      {t("product.feature.fast.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-orange-500 mb-2">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold">
                      {t("product.feature.friendly")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("product.feature.friendly.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-orange-500 mb-2">
                      <svg
                        className="w-8 h-8"
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
                    <h3 className="font-bold">
                      {t("product.feature.customizable")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("product.feature.customizable.desc")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-orange-500 mb-2">
                      <svg
                        className="w-8 h-8"
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
                    <h3 className="font-bold">
                      {t("product.feature.reliable")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("product.feature.reliable.desc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={
                    content.photos[0] ||
                    "https://source.unsplash.com/random/600x800/?product"
                  }
                  alt="Product"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold">
                    {content.productName}
                  </h3>
                  <p className="text-gray-200">{t("product.premium")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section id="description" className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              {t("description.title")}
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {content.productDetailedDescription}
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-lg">
                  <div className="bg-orange-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 7H7v6h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t("description.feature.performance")}
                  </h3>
                  <p className="text-gray-600">
                    {t("description.feature.performance.desc")}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-lg">
                  <div className="bg-orange-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t("description.feature.design")}
                  </h3>
                  <p className="text-gray-600">
                    {t("description.feature.design.desc")}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-lg">
                  <div className="bg-orange-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t("description.feature.materials")}
                  </h3>
                  <p className="text-gray-600">
                    {t("description.feature.materials.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
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
      <section id="compatibility" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            {t("compatibility.title")}
          </h2>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-lg shadow-lg p-8 border border-orange-100">
              <p className="text-lg mb-8 text-center">
                {content.compatibilityText}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-white p-4 rounded-full shadow-md text-orange-500 mb-3">
                      {platform.icon}
                    </div>
                    <span className="font-semibold">{platform.name}</span>
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
