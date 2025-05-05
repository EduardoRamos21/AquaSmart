import { Popover, Transition } from "@headlessui/react";
import { Bell } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export function NotificationBell() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/notificaciones`)
      .then((res) => res.json())
      .then((data) => setNotificaciones(data))
      .catch((err) => console.error("❌ Error al obtener notificaciones:", err));
  }, []);

  return (
    <div className="relative">
      <Popover className="relative">
        <Popover.Button className="relative bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-blue-600" />
          {notificaciones.length > 0 && !visto && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {notificaciones.length}
            </span>
          )}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            onMouseEnter={() => setVisto(true)}
            className="absolute z-[9999] w-72 max-w-[90vw] bg-white shadow-lg rounded-lg p-4 border border-gray-200 right-0 top-full mt-3 md:right-0 md:left-auto transform-none"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🕓 Últimas notificaciones
            </h3>

            <div className="max-h-80 overflow-y-auto space-y-3">
              {notificaciones.length === 0 ? (
                <p className="text-sm text-gray-500">No hay notificaciones recientes.</p>
              ) : (
                notificaciones.map((n, i) => {
                  const fecha = new Date(n.timestamp).toLocaleString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  const planta = n.planta === 1 ? "Aguacate" : "Naranja";
                  const icono = n.evento.includes("crítica") ? "⚠️" : "💧";

                  return (
                    <div
                      key={i}
                      className="border-l-4 pl-3 border-blue-500 bg-blue-50 p-2 rounded shadow-sm"
                    >
                      <p className="text-sm font-medium text-blue-800">
                        {icono} {n.evento}
                      </p>
                      <p className="text-xs text-gray-600">
                        Planta {planta} ({n.porcentaje}%)
                      </p>
                      <p className="text-xs text-gray-400">{fecha}</p>
                    </div>
                  );
                })
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}