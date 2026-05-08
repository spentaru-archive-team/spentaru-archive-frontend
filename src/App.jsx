import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import Login from "./pages/Login";
import { TooltipProvider } from "./components/ui/tooltip";
import BaseLayout from "./layouts/BaseLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Archive from "./pages/archive/ArchivePage";
import Category from "./pages/category/CategoryPage";
import Location from "./pages/archiveLocation/LocationPage";
import Event from "./pages/event/EventPage";
import User from "./pages/user/UserPage";
import StorageRule from "./pages/storageRule/StorageRulePage";
import Cabinet from "./pages/cabinet/CabinetPage";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import ArchivePreviewPage from "./pages/archive/ArchivePreviewPage";
import About from "./pages/About";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {/* Main App */}
            <Route element={<BaseLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Event />} />
                <Route path="/archives" element={<Archive />} />
                <Route
                  path="/archives/:archiveId/preview"
                  element={<ArchivePreviewPage />}
                />
                <Route path="/categories" element={<Category />} />
                <Route path="/archive-locations" element={<Location />} />
                <Route path="/users" element={<User />} />
                <Route path="/storage-rules" element={<StorageRule />} />
                <Route path="/cabinets" element={<Cabinet />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
