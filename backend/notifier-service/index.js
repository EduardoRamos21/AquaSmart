require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4002;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🟢 Conectado a MongoDB (notifier)"))
.catch((err) => console.error("❌ Error en MongoDB:", err));

// Modelo de notificación
const Notificacion = mongoose.model("Notificacion", new mongoose.Schema({
  planta: Number,
  porcentaje: Number,
  evento: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}));

// POST /notify → Guarda la notificación
app.post("/notify", async (req, res) => {
  const { planta, porcentaje, evento } = req.body;
  const nombrePlanta = planta === 1 ? "Aguacate" : "Naranja";

  console.log(`📢 [NOTIFICACIÓN] ${evento} - Planta ${nombrePlanta} (${porcentaje}%)`);

  try {
    await Notificacion.create({ planta, porcentaje, evento });
    res.json({ status: "ok", mensaje: "Notificación almacenada" });
  } catch (err) {
    console.error("❌ Error al guardar notificación:", err.message);
    res.status(500).json({ error: "Error al guardar notificación" });
  }
});

// GET /notificaciones → Devuelve las 10 más recientes
app.get("/notificaciones", async (req, res) => {
  try {
    const historial = await Notificacion.find().sort({ timestamp: -1 }).limit(10);
    res.json(historial);
  } catch (err) {
    console.error("❌ Error al obtener historial:", err.message);
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

app.listen(PORT, () => {
  console.log(`📣 Notifier-service escuchando en http://localhost:${PORT}`);
});
