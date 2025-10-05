import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallPopup } from "./CallPopup";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'in' | 'out'>('in');
  const [isReservePopupOpen, setIsReservePopupOpen] = useState(false);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#celebrations", label: "Celebrations" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleMenuClose();
    }
  };

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      handleMenuClose();
    } else {
      setIsMenuOpen(true);
      setAnimationType('in');
    }
  };

  const handleMenuClose = () => {
    setIsAnimating(true);
    setAnimationType('out');
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsAnimating(false);
    }, 300); // Match fade-out duration
  };

  // Функція для перевірки чи це мобільний пристрій
  const isMobile = () => {
    return window.matchMedia('(max-width: 768px)').matches || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleReserve = () => {
    if (isMobile()) {
      // На мобільних пристроях створюємо невидиме посилання та клікаємо по ньому
      const link = document.createElement('a');
      link.href = 'tel:+421910000000';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // На комп'ютері показуємо попап
      setIsReservePopupOpen(true);
    }
  };



  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop: Centered macOS Style Navigation Bar */}
      <div className="hidden md:flex justify-center pt-4">
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

            {/* Reserve Button - Right side */}
            <div className="flex items-center flex-shrink-0">
              <Button 
                size="sm"
                className="bg-gradient-primary text-primary-foreground hover:shadow-md hover:scale-105 font-medium transition-all duration-300 px-4 py-2 text-sm rounded-full"
                onClick={handleReserve}
              >
                Reserve
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile: Centered Navigation Bar */}
      <div className="md:hidden flex justify-center pt-3 px-4">
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden flex justify-center px-4 mt-2 ${animationType === 'out' ? 'animate-fade-out' : 'animate-fade-in'}`}>
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
              
              <div className="pt-2 border-t border-white/20 mt-4">
                <Button 
                  className="w-full bg-gradient-primary text-primary-foreground hover:shadow-md font-medium transition-all duration-300 py-2.5 text-sm rounded-xl"
                  onClick={handleReserve}
                >
                  Reserve
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call Popup - тільки для комп'ютерної версії */}
      <CallPopup
        isOpen={isReservePopupOpen}
        onClose={() => setIsReservePopupOpen(false)}
        title="Reserve"
        description="Call us to make a reservation at our restaurant"
        phoneNumber="+421910000000"
      />
    </header>
  );
};