import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import { TooltipProvider } from "./components/ui/tooltip";
import BaseLayout from "./layouts/BaseLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Main App */}
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
