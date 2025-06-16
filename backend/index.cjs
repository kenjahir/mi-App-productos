// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Usuarios de prueba
const USERS = [
  { email: "demo@email.com", password: "123456", nombre: "Usuario Demo" },
  { email: "admin@email.com", password: "admin", nombre: "Admin" }
];

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(
    u => u.email === email && u.password === password
  );
  if (user) {
    res.json({ email: user.email, nombre: user.nombre });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});