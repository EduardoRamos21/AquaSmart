const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
const PORT = 3000;

//app.use(cors());

//modificacion/////////////////
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.0.101:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

////////////////////////////
app.use(express.json());

// Logs
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

// Redirige a auth-service
app.use("/api/auth", proxy("http://localhost:3001", {
  proxyReqPathResolver: (req) => `/api${req.url}`,
}));

// Redirige a sensor-service (solo /api/sensor → /humedad)
app.use("/api/sensor", proxy("http://localhost:4001", {
  proxyReqPathResolver: () => `/humedad`,
}));

// Redirige a notifier-service
app.use("/api/notificaciones", proxy("http://localhost:4002", {
  proxyReqPathResolver: () => `/notificaciones`,
}));


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Gateway escuchando en todas las interfaces en el puerto ${PORT}`);
});
