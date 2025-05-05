import { Navigate } from "react-router-dom";
import { SignIn, SignUp, Home } from "@/pages";
import DashboardLayout from "@/widgets/layout/dashboard/DashboardLayout";
import DashboardHome from "@/pages/dashboard/index";
import PrivateRoute from "./widgets/components/PrivateRoute.jsx";

export const routes = [
  {
    path: "/", // 👈 Esto redirige a /home si entran a /
    element: <Navigate to="/home" replace />,
  },
  {
    name: "Inicio",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Inicia Sesión",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Regístrate",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Dashboard",
    path: "/dashboard/*",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
    ],
  },
];

export default routes;
