import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface CallPopupProps {
  isOpen: boolean;
  onClose: () => void;
  purpose?: 'booking' | 'events';
}

export const CallPopup = ({ isOpen, onClose, purpose = 'booking' }: CallPopupProps) => {
  const { t } = useTranslation();
  
  const getPhoneNumber = () => {
    return purpose === 'events' ? '+421 902 966 666' : '+421 901 900 008';
  };
  
  const getTitle = () => {
    return purpose === 'events' ? t('callPopup.eventTitle') : t('callPopup.bookingTitle');
  };
  
  const getDescription = () => {
    return purpose === 'events' ? t('callPopup.eventDescription') : t('callPopup.bookingDescription');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 pt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{getPhoneNumber()}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {t('callPopup.businessHours')}
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onClose}
              variant="outline"
              className="px-8"
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};