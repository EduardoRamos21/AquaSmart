import { useLocation, useRoutes } from "react-router-dom";
import { Navbar } from "@/widgets/layout"; // Este es el navbar para la landing
import routes from "@/routes";

function App() {
  const { pathname } = useLocation();
  const routing = useRoutes(routes);

  // Ocultar el navbar global en login, signup y dashboard
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isAuthRoute && !isDashboard && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}
      {routing}
    </>
  );
}

export default App;
