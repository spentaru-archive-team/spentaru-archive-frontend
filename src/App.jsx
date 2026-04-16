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
import Event from "./pages/event/EventPage";
import User from "./pages/user/UserPage";
import StorageRule from "./pages/storageRule/StorageRulePage";

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
                <Route path="/events" element={<Event />} />
                <Route path="/archives" element={<Archive />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/archive-locations" element={<Location />} />
                <Route path="/users" element={<User />} />
                <Route path="/storage-rules" element={<StorageRule />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
