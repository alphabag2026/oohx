import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CreatorDetail from "./pages/CreatorDetail";
import AIGenerate from "./pages/AIGenerate";
import Chat from "./pages/Chat";
import MyPage from "./pages/MyPage";
import Explore from "./pages/Explore";
import AdminCreators from "./pages/AdminCreators";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/creator/:id"} component={CreatorDetail} />
      <Route path={"/ai-generate"} component={AIGenerate} />
      <Route path={"/chat/:id"} component={Chat} />
      <Route path={"/my"} component={MyPage} />
      <Route path={"/mypage"} component={MyPage} />
      <Route path={"/explore"} component={Explore} />
      <Route path={"/admin/creators"} component={AdminCreators} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - OohX uses dark theme (deep red/dark tone design)
// - Color palette managed in client/src/index.css

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
