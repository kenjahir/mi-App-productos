import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ProductProvider } from "./context/ProductContext";
import LanguageSelector from "./components/LanguageSelector";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import LoginForm from "./components/LoginForm";
import "./index.css";

export default function App() {
  // Intenta recuperar usuario desde localStorage al cargar
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Si no hay usuario logueado, muestra el login
  if (!user) {
    return (
      <LanguageProvider>
        <div
          className="main-container"
          style={{
            padding: 28,
            fontFamily: "system-ui, sans-serif",
            minHeight: "100vh",
            background: "linear-gradient(120deg, #f8fafc 0%, #eef5ff 100%)"
          }}
        >
          <div
            className="inner-container"
            style={{
              maxWidth: 950,
              margin: "32px auto",
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 6px 32px #6366f130",
              padding: 38,
              minHeight: "90vh",
              position: "relative"
            }}
          >
            <LoginForm onLogin={setUser} />
          </div>
        </div>
      </LanguageProvider>
    );
  }

  // Si hay usuario logueado, muestra la app de productos
  return (
    <LanguageProvider>
      <ProductProvider>
        <div
          className="main-container"
          style={{
            padding: 28,
            fontFamily: "system-ui, sans-serif",
            minHeight: "100vh",
            background: "linear-gradient(120deg, #f8fafc 0%, #eef5ff 100%)"
          }}
        >
          <div
            className="inner-container"
            style={{
              maxWidth: 950,
              margin: "32px auto",
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 6px 32px #6366f130",
              padding: 38,
              minHeight: "90vh",
              position: "relative"
            }}
          >
            <div style={{ textAlign: "right", marginBottom: 10 }}>
              <span style={{ marginRight: 12, color: "#0369a1", fontWeight: 500 }}>
                {user.email || "Usuario"}
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "6px 15px",
                  border: "none",
                  borderRadius: 7,
                  background: "#dc2626",
                  color: "#fff",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Cerrar sesión
              </button>
            </div>
            <LanguageSelector />
            <AddProductForm />
            <ProductList />
          </div>
        </div>
      </ProductProvider>
    </LanguageProvider>
  );
}