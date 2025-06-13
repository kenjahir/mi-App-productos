import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductContext";

export default function AddProductForm() {
  const { t } = useLanguage();
  const { addProduct } = useProducts();
  const [nameEs, setNameEs] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nameEs.trim() || !nameEn.trim()) {
      setError(t("required"));
      return;
    }
    addProduct({ es: nameEs.trim(), en: nameEn.trim() });
    setNameEs("");
    setNameEn("");
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
        margin: "0 auto"
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
          onChange={e => setNameEs(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: 10,
            borderRadius: 8,
            border: "1.5px solid #c7d2fe",
            background: "#f3f4f6",
            fontSize: 15
          }}
        />
        <input
          type="text"
          placeholder={t("productNameEN")}
          value={nameEn}
          onChange={e => setNameEn(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1.5px solid #c7d2fe",
            background: "#f3f4f6",
            fontSize: 15
          }}
        />
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
          transition: "background 0.2s"
        }}
      >
        {t("add")}
      </button>
    </form>
  );
}