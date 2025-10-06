import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MyOrderProvider } from "@/context/MyOrderContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Loading component поки i18n ініціалізується
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Načítava...</p>
    </div>
  </div>
);

const App = () => {
  const { ready, i18n } = useTranslation();
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    // Додаткова перевірка готовності i18n
    const checkI18nReady = async () => {
      if (ready && i18n.isInitialized) {
        // Якщо немає мови в localStorage, встановлюємо SK
        if (!localStorage.getItem('i18nextLng')) {
          await i18n.changeLanguage('sk');
        }
        setIsI18nReady(true);
      }
    };

    checkI18nReady();
  }, [ready, i18n]);

  // Показуємо loader поки i18n не готовий
  if (!isI18nReady) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MyOrderProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </MyOrderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
