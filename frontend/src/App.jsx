import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import "./App.css";
import Spinner from "./Components/Spinner";

function App() {
  const { user, checkingAuth, checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <Spinner />;
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div class="w-full h-full absolute top-0 bg-gradient-to-br from-orange-200 to-green-200 shadow-md  p-10"></div>
      </div>
      <div className="relative z-10 pt-20">
        <Routes>
          <Route
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
