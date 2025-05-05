const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aquasmart',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos de autenticación');
  }
});

//Registro de usuarios
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log("📨 [AUTH] Solicitud de registro:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error("❌ Error SQL:", err); // 👈 Añade esto
      return res.status(500).json({ success: false, message: 'Error en el registro', error: err });
    }

    res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });
  });
});

// Inicio de sesión
app.post('/api/login', (req, res) => {
  console.log("🔐 [AUTH] Solicitud de login:", req.body);
  const { email, password } = req.body;
  const query = 'SELECT id, name FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: err });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = results[0];
    res.status(200).json({
      success: true,
      id: user.id,
      name: user.name,
    });
  });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth-service corriendo en http://localhost:${PORT}`);
});
