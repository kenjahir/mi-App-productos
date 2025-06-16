import React, { createContext, useContext, useEffect, useState } from "react";

// URL de tu backend (ajusta el puerto si es necesario)
const API_URL = "http://localhost:4000/api";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState(null); // Se inicializa cuando el usuario loguea
  const [loading, setLoading] = useState(false);

  // Para recibir el email desde el login
  function setEmail(email) {
    setUserEmail(email);
  }

  // Cargar productos al iniciar sesión
  async function fetchProducts(email) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products?email=${email}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setProducts([]);
    }
    setLoading(false);
  }

  // Agregar producto
  async function addProduct(product) {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, product }),
    });
    const data = await res.json();
    setProducts((prev) => [...prev, data]);
  }

  // Eliminar producto
  async function deleteProduct(id) {
    await fetch(`${API_URL}/products/${id}?email=${userEmail}`, {
      method: "DELETE",
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // Actualizar producto
  async function updateProduct(id, updates) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, product: updates }),
    });
    const data = await res.json();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  // Cargar productos cuando cambia el usuario
  useEffect(() => {
    if (userEmail) fetchProducts(userEmail);
    else setProducts([]);
  }, [userEmail]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        deleteProduct,
        updateProduct,
        setEmail, // para actualizar el email desde App
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}