const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Usuarios de prueba
const USERS = [
  { email: "demo@email.com", password: "123456", nombre: "Usuario Demo" },
  { email: "admin@email.com", password: "admin", nombre: "Admin" }
];

// Guardar productos en memoria por usuario (clave: email)
const productsByUser = {};

app.use(cors());
app.use(express.json());

// LOGIN
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

// LISTAR productos del usuario autenticado
app.get('/api/products', (req, res) => {
  const user = req.query.email; // frontend mandará email por query
  if (!user) return res.status(400).json({ error: "Falta email de usuario" });
  res.json(productsByUser[user] || []);
});

// AGREGAR producto
app.post('/api/products', (req, res) => {
  const { email, product } = req.body;
  if (!email || !product) return res.status(400).json({ error: "Faltan datos" });
  // Agrega id único
  product.id = Date.now();
  // Inicializa si no existe
  if (!productsByUser[email]) productsByUser[email] = [];
  productsByUser[email].push(product);
  res.json(product);
});

// ACTUALIZAR producto
app.put('/api/products/:id', (req, res) => {
  const { email, product } = req.body;
  const id = parseInt(req.params.id);
  if (!email || !product || !id) return res.status(400).json({ error: "Faltan datos" });
  const userProducts = productsByUser[email] || [];
  const index = userProducts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });
  userProducts[index] = { ...userProducts[index], ...product, id }; // actualiza
  res.json(userProducts[index]);
});

// ELIMINAR producto
app.delete('/api/products/:id', (req, res) => {
  const email = req.query.email;
  const id = parseInt(req.params.id);
  if (!email || !id) return res.status(400).json({ error: "Faltan datos" });
  const userProducts = productsByUser[email] || [];
  const index = userProducts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });
  const deleted = userProducts.splice(index, 1);
  res.json({ ok: true, deleted: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});