import { useEffect, useState } from "react";

export function useSensorData() {
  const [data, setData] = useState([]);  // Cambiado de 'lecturas' a 'data'
  const [isLoading, setIsLoading] = useState(true);  // Cambiado de 'loading' a 'isLoading'

  useEffect(() => {
    async function fetchData() {
      try { //cambiado res
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/sensor`);

        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const responseData = await res.json();
        console.log("Datos recibidos:", responseData);
        setData(responseData);
      } catch (err) {
        console.error("❌ Error al obtener lecturas:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    const intervalo = setInterval(fetchData, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return { data, isLoading };  // Devolver los nombres correctos
}