import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/BlogDetail";
import Projects from "@/pages/projects";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogDetail} /> {/* ✅ Fix was missing */}
      <Route path="/projects" component={Projects} />
      <Route path="/contact" component={Contact} />
      <Route path={import.meta.env.VITE_SECRET_ADMIN_URL} component={Admin} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <TooltipProvider>
          <Router> {/* ✅ Required to avoid "useContext(...) is null" error */}
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <AppRouter />
              </main>
              <Footer />
            </div>
            <Toaster />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
