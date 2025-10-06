import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "#home", label: t('nav.home') },
    { href: "#celebrations", label: t('nav.celebrations') },
    { href: "#menu", label: t('nav.menu') },
    { href: "#gallery", label: t('nav.gallery') },
    { href: "#reviews", label: t('nav.reviews') },
    { href: "#about", label: t('nav.about') },
    { href: "#contact", label: t('nav.contact') }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop: Centered macOS Style Navigation Bar */}
      <div className="hidden md:flex justify-center pt-4 pb-2">
        <nav className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 shadow-lg mx-4 max-w-4xl w-full">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Left side */}
            <div className="flex items-center flex-shrink-0">
              <img 
                src="./logo-new-small-black.png" 
                alt="Na Vodnom"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation - Center */}
            <div className="flex items-center justify-center flex-1 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-primary hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-sm whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Switcher - Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile: Centered Navigation Bar with Safe Area */}
      <div 
        className="md:hidden flex justify-center mobile-nav-safe android-nav-fix"
        style={{
          paddingTop: 'max(12px, env(safe-area-inset-top, 12px))',
          paddingBottom: '8px'
        }}
      >
        <nav className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2.5 shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="./logo-new-small-black.png" 
                alt="Na Vodnom"
                className="h-7 w-auto"
              />
            </div>

            {/* Mobile Menu Button & Language Switcher */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/10 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with improved positioning */}
      {isMenuOpen && (
        <div className="md:hidden flex justify-center mobile-nav-safe mt-2">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-4 shadow-lg w-full max-w-sm">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-foreground/80 hover:text-primary hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};