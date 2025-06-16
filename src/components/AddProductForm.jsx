import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductContext";

export default function AddProductForm() {
  const { t, lang } = useLanguage();
  const { addProduct } = useProducts();
  const [nameEs, setNameEs] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result); // Guarda base64
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nameEs.trim() || !nameEn.trim()) {
      setError(t("required"));
      return;
    }
    await addProduct({
      name: { es: nameEs.trim(), en: nameEn.trim() },
      photo: photo || null,
    });
    setNameEs("");
    setNameEn("");
    setPhoto(null);
    setError("");
  };

  return (
    <form
      onSubmit={handleAdd}
      style={{
        background: "#f6f8fa",
        padding: 18,
        borderRadius: 14,
        marginBottom: 30,
        maxWidth: 390,
        boxShadow: "0 1px 7px #a5b4fc14",
        margin: "0 auto",
      }}
    >
      <h3 style={{ marginTop: 0, color: "#64748b", fontWeight: 700 }}>
        {t("addProduct")}
      </h3>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder={t("productNameES")}
          value={nameEs}
          onChange={(e) => setNameEs(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: 10,
            borderRadius: 8,
            border: "1.5px solid #c7d2fe",
            background: "#f3f4f6",
            fontSize: 15,
          }}
        />
        <input
          type="text"
          placeholder={t("productNameEN")}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1.5px solid #c7d2fe",
            background: "#f3f4f6",
            fontSize: 15,
          }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhoto}
          style={{
            background: "#f3f4f6",
            borderRadius: 8,
            padding: "7px 0",
          }}
        />
        {photo && (
          <div style={{ marginTop: 8, textAlign: "center" }}>
            <img
              src={photo}
              alt="Vista previa"
              style={{ maxWidth: 120, borderRadius: 8, margin: "auto" }}
            />
          </div>
        )}
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: 8, fontSize: 15 }}>{error}</div>
      )}
      <button
        type="submit"
        style={{
          padding: "9px 24px",
          border: "none",
          borderRadius: 8,
          background: "linear-gradient(90deg, #2563eb 60%, #1d4ed8 100%)",
          color: "white",
          fontWeight: 700,
          fontSize: 16,
          marginTop: 8,
          boxShadow: "0 2px 12px #2563eb22",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        {t("add")}
      </button>
    </form>
  );
}