import React from "react";
import { NotificationBell } from "@/widgets/components/NotificationBell";
import { Navbar as MTNavbar, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/sign-in");
  };

  return (
    <MTNavbar
      fullWidth
      className="relative z-[100] rounded-none border-0 px-4 shadow-md"
      style={{
        background: "linear-gradient(to right, #0284c7, #4338ca)",
        color: "#ffffff",
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          {/* Título + subtítulo */}
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-white">AquaSmart</h1>
            <p className="text-white text-xs md:text-sm mt-0.5">
              Sistema de Riego Automatizado Inteligente
            </p>
          </div>
          
          {/* Botón cerrar sesión + campana */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative z-20">
              <NotificationBell />
            </div>
            <Button
              onClick={handleLogout}
              variant="filled"
              size="sm"
              className="bg-white text-blue-700 hover:bg-gray-100 text-xs md:text-sm px-2 py-1.5 md:px-4"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </MTNavbar>
  );
}

export default Navbar;