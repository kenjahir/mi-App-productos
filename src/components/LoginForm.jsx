import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Cambia la URL por la de tu backend real
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        // Guarda también en localStorage
        localStorage.setItem("user", JSON.stringify(data));
        onLogin(data);
      } else {
        setError(data.error || "Error de autenticación");
      }
    } catch (err) {
      setError("Error de red o servidor");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 350,
      margin: "60px auto 30px auto",
      background: "#f8fafc",
      padding: 30,
      borderRadius: 14,
      boxShadow: "0 4px 16px #0ea5e930"
    }}>
      <h2 style={{ marginBottom: 22, color: "#0ea5e9" }}>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: 11, marginBottom: 16, borderRadius: 8, border: "1.5px solid #bae6fd", background: "#fff" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 11, marginBottom: 22, borderRadius: 8, border: "1.5px solid #bae6fd", background: "#fff" }}
      />
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 0",
          border: "none",
          borderRadius: 8,
          background: "linear-gradient(90deg,#2563eb 50%, #0ea5e9 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Accediendo..." : "Entrar"}
      </button>
    </form>
  );
}