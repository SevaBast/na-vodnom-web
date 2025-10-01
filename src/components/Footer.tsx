import { restaurantInfo } from "@/data/restaurantData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export const Footer = () => {
  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    telegram: MessageCircle,
    tiktok: MessageCircle
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Restaurant Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">С</span>
                </div>
                <span className="text-2xl font-bold">{restaurantInfo.name}</span>
              </div>
              <p className="text-background/80 leading-relaxed">
                {restaurantInfo.description.split('.')[0]}.
              </p>
            </div>
            
            <Button 
              variant="hero" 
              onClick={scrollToTop}
              className="w-full sm:w-auto"
            >
              Book a Table
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium">Address</p>
                <p className="text-background/70 text-sm">{restaurantInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium">Phone</p>
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-background/70 text-sm hover:text-primary transition-colors"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium">Email</p>
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-background/70 text-sm hover:text-primary transition-colors"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Working Hours</h3>
            <div className="space-y-3">
              {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-background/80">{day}</span>
                  <span className="text-background/90 font-medium">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Social Media</h3>
            <div className="space-y-3">
              {Object.entries(restaurantInfo.socialMedia).map(([platform, url]) => {
                if (!url) return null;
                
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                const platformNames = {
                  instagram: 'Instagram',
                  facebook: 'Facebook',
                  telegram: 'Telegram',
                  tiktok: 'TikTok'
                };
                
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors group"
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{platformNames[platform as keyof typeof platformNames]}</span>
                  </a>
                );
              })}
            </div>
            
            <div className="pt-4">
              <p className="text-background/60 text-sm mb-4">
                Follow us on social media for the latest news and promotions!
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <div>
            <p>© 2024 {restaurantInfo.name}. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={scrollToTop}
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={scrollToTop}
              className="hover:text-primary transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};