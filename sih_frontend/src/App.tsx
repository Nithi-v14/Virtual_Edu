import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Modules from "./pages/Modules";
import QuizPage from "./pages/QuizPage";
import Simulation from "./pages/Simulation";
import Emergency from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PuzzleGames from "./pages/PuzzleGames";
import { useState } from "react";
import AIAssistant from "./components/AIAssistant";
import Register from "./pages/Register";
const queryClient = new QueryClient();
  
const App = () => (

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Index />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/simulation" element={<Simulation />} />
            {/* <Route path="/emergency" element={<Emergency />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
           {/* <AIAssistant /> */}
        </Layout>
       
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
