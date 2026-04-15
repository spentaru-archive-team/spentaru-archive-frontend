import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import { TooltipProvider } from "./components/ui/tooltip";
import BaseLayout from "./layouts/BaseLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Archive from "./pages/archive/ArchivePage";
import Category from "./pages/category/CategoryPage";
import Location from "./pages/location/LocationPage";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {/* Main App */}
            <Route element={<BaseLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/archives" element={<Archive />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/physical-locations" element={<Location />} />
                <Route path="/users" element={<Location />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
