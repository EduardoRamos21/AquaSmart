import React from "react";
import {
  Typography,
  Card,
} from "@material-tailwind/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Settings, History } from "lucide-react";
import { FaBell, FaLeaf, FaWater } from "react-icons/fa";
import { AnimatedCircularProgressBar } from "@/widgets/components/magicui/animated-circular-progress-bar";
import { useSensorData } from "@/api/useSensorData";




//animaciones

import Lottie from "lottie-react";
import aguacateAnimation from "@/assets/animations/aguacate.json";
import naranjaAnimation from "@/assets/animations/naranja.json";
import waterNivelAnimation from "@/assets/animations/waternivel.json";
import dangerAnimation from "@/assets/animations/danger.json";


//graficas
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceArea, 
} from "recharts";


export default function DashboardHome() {
  const { data, isLoading } = useSensorData();

  if (isLoading || !data)
    return <div className="text-center py-8">🔄 Cargando datos...</div>;

  const planta1 = data.find((d) => d.planta === 1);
  const planta2 = data.find((d) => d.planta === 2);



  //graficas
  const lecturasPlanta1 = data
  .filter((d) => d.planta === 1)
  .slice(0, 10)
  .reverse();

const lecturasPlanta2 = data
  .filter((d) => d.planta === 2)
  .slice(0, 10)
  .reverse();


  const bombas = [
    {
      id: 1,
      zona: "Aguacate",
      estado: planta1?.bomba ? "Activa" : "Inactiva",
    },
    {
      id: 2,
      zona: "Naranja",
      estado: planta2?.bomba ? "Activa" : "Inactiva",
    },
  ];
  

  const historial = [
    { fecha: "2025-04-12", evento: "Bomba 1 activada", tipo: "Automático" },
    { fecha: "2025-04-12", evento: "Bomba 2 desactivada", tipo: "Manual" },
    { fecha: "2025-04-11", evento: "Humedad baja detectada", tipo: "Alerta" },
  ];




// Colores dinámicos según nivel de humedad

// Aguacate (planta 1)
const aguacateColor =
planta1?.porcentaje < 40
  ? "#ef4444" // rojo
  : planta1?.porcentaje < 60
  ? "#f97316" // naranja
  : "#22c55e"; // verde

// Naranja (planta 2)
const naranjaColor =
planta2?.porcentaje < 35
  ? "#ef4444"
  : planta2?.porcentaje < 50
  ? "#f97316"
  : "#3b82f6";


const aguacateEnPeligro = planta1?.porcentaje < 60;
const naranjaEnPeligro = planta2?.porcentaje < 50;




  return (


    <div className="mt-6 px-4 space-y-6">
      {/* 🌿 Indicadores de humedad por planta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🥑 Aguacate */}
        <Card className="flex flex-col items-center justify-center py-6 space-y-4">
          <Typography variant="h6">Planta Aguacate</Typography>
          <div className="w-32 h-32">
            <Lottie
              animationData={aguacateEnPeligro ? dangerAnimation : aguacateAnimation}
              loop
              autoplay
              style={{ width: "8rem", height: "8rem" }}
            />
          </div>
          <AnimatedCircularProgressBar
            value={planta1?.porcentaje || 0}
            gaugePrimaryColor={aguacateColor}
            gaugeSecondaryColor="#e5e7eb"
          />

        </Card>

        {/* 🍊 Naranja */}
        <Card className="flex flex-col items-center justify-center py-6 space-y-4">
          <Typography variant="h6">Planta Naranja</Typography>
          <div className="w-32 h-32">
            <Lottie
              animationData={naranjaEnPeligro ? dangerAnimation : naranjaAnimation}
              loop
              autoplay
              style={{ width: "8rem", height: "8rem" }}
            />
          </div>

          <AnimatedCircularProgressBar
            value={planta2?.porcentaje || 0}
            gaugePrimaryColor={naranjaColor}
            gaugeSecondaryColor="#e5e7eb"
          />

        </Card>
      </div>

      {/* 💧 Estado de bombas */}
      
      <Card className="p-4 shadow-md">
        <Typography variant="h6" className="mb-4 text-gray-700 flex items-center gap-2">
          <Settings className="w-5 h-5" /> Estado de Bombas
        </Typography>
        <ul className="space-y-2">
          {bombas.map((b) => (
            <motion.li
              key={b.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">Bomba {b.zona}</span>
                                {b.estado === "Activa" && (
                  <div className="w-8 h-8 overflow-hidden flex items-center justify-center rounded-full bg-transparent">
                    <Lottie
                      animationData={waterNivelAnimation}
                      loop
                      autoplay
                      style={{ width: "2.2rem", height: "2.2rem", marginTop: "-0.2rem" }}
                    />
                  </div>
                )}


              </div>
              <span
                className={`text-sm font-bold ${
                  b.estado === "Activa" ? "text-green-600" : "text-red-500"
                }`}
              >
                {b.estado}
              </span>
            </motion.li>
          ))}
        </ul>
      </Card>


      {/* 📈 Humedad - Planta Aguacate */}
<Card className="p-4 shadow-md">
  <Typography variant="h6" className="mb-4 text-gray-700">
    📈 Humedad - Planta Aguacate
  </Typography>
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={lecturasPlanta1}>
      <CartesianGrid strokeDasharray="3 3" />
      {/* Sombra de zona crítica < 60% */}
      <ReferenceArea y1={0} y2={60} strokeOpacity={0.1} fill="#fecaca" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(value) =>
          new Date(parseInt(value)).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="porcentaje"
        stroke="#22c55e"
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
</Card>

{/* 📈 Humedad - Planta Naranja */}
<Card className="p-4 shadow-md">
  <Typography variant="h6" className="mb-4 text-gray-700">
    📈 Humedad - Planta Naranja
  </Typography>
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={lecturasPlanta2}>
      <CartesianGrid strokeDasharray="3 3" />
      {/* Sombra de zona crítica < 50% */}
      <ReferenceArea y1={0} y2={50} strokeOpacity={0.1} fill="#fef08a" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(value) =>
          new Date(parseInt(value)).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="porcentaje"
        stroke="#3b82f6"
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
</Card>




      {/* 🕓 Historial de eventos */}
      <Card className="p-4 shadow-md">
        <Typography variant="h6" className="mb-4 text-gray-700 flex items-center gap-2">
          <History className="w-5 h-5" /> Historial de Eventos
        </Typography>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-blue-gray-600">
              <th className="pb-2">Fecha</th>
              <th className="pb-2">Planta</th>
              <th className="pb-2">Humedad</th>
              <th className="pb-2">Evento</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0, 10)
              .reverse()
              .map((e, i) => {
                const fecha = new Date(parseInt(e.timestamp)).toLocaleString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                const planta = e.planta === 1 ? "Aguacate" : "Naranja";
                const evento =
                  e.bomba === true
                    ? "💧 Bomba activada"
                    : e.porcentaje < (e.planta === 1 ? 60 : 50)
                    ? "⚠️ Humedad crítica"
                    : "✅ Sin acción";

                return (
                  <tr key={i} className="border-t">
                    <td className="py-2">{fecha}</td>
                    <td className="py-2">{planta}</td>
                    <td className="py-2">{e.porcentaje}%</td>
                    <td className="py-2">{evento}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>

    </div>

    
  );


}
