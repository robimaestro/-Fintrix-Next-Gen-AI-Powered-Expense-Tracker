
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ExpensesPage from "./pages/ExpensesPage";
import AssistantPage from "./pages/AssistantPage";
import CryptoPage from "./pages/CryptoPage";
import LifestyleDashboard from "./pages/LifestyleDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<ExpensesPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/lifestyle" element={<LifestyleDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
