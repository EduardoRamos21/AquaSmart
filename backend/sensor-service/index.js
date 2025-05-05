require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
const axios = require("axios");


const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Modelo de datos
const Lectura = mongoose.model("Lectura", new mongoose.Schema({
  planta: Number,
  porcentaje: Number,
  bomba: Boolean,
  timestamp: String
}));

// POST /humedad
app.post("/humedad", async (req, res) => {
  const { planta, porcentaje, bomba, timestamp } = req.body;

  if (!planta || porcentaje === undefined || bomba === undefined || !timestamp) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const nuevaLectura = new Lectura({ planta, porcentaje, bomba, timestamp });
  await nuevaLectura.save();

  console.log("✅ Lectura guardada:", { planta, porcentaje, bomba, timestamp });

  // Notificar si bomba fue activada o humedad crítica
  const humedadCritica = (planta === 1 && porcentaje < 60) || (planta === 2 && porcentaje < 50);

  if (bomba || humedadCritica) {
    const evento = bomba
      ? "Bomba activada"
      : "Humedad crítica";

    try {
      await axios.post("http://localhost:4002/notify", {
        planta,
        porcentaje,
        evento,
      });

      console.log("📨 Notificación enviada al notifier-service");
    } catch (error) {
      console.error("❌ Error al enviar notificación:", error.message);
    }
  }

  res.json({ status: "ok" });
});



// GET /humedad
app.get("/humedad", async (req, res) => {
  const lecturas = await Lectura.find().sort({ _id: -1 }).limit(10);
  res.json(lecturas);
});

// Iniciar servidor
connectDB().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`📡 Sensor-service escuchando en http://0.0.0.0:${port}`);
  });
});