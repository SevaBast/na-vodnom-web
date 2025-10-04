import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CallPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  phoneNumber: string;
}

export const CallPopup = ({ isOpen, onClose, title, description, phoneNumber }: CallPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 pt-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Please call us at:</p>
            <p className="text-lg font-semibold text-foreground">{phoneNumber}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Copy the number and dial manually
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onClose}
              variant="outline"
              className="px-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};