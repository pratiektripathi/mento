import Navbar from "./components/navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Mentors from "./components/Mentors";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/dashboard" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Mentors />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {location.pathname !== "/dashboard" && <Footer />}
    </>
  );
}

export default App
