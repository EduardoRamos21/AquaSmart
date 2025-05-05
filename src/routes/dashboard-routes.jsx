import {
    PresentationChartBarIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/solid";
  
  export const dashboardRoutes = [
    {
      title: "Dashboard",
      layout: "dashboard",
      pages: [
        {
          name: "Inicio",
          icon: () => <PresentationChartBarIcon className="h-5 w-5" />,
          path: "", // esto redirige a /dashboard
        },
        {
          name: "Configuración",
          icon: () => <Cog6ToothIcon className="h-5 w-5" />,
          path: "settings", // esto redirige a /dashboard/settings
        },
      ],
    },
  ];
  