import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductContext";

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage();
  const { deleteProduct } = useProducts();

  return (
    <div
      className="product-card"
      style={{
        border: "1.5px solid #e5e7eb",
        borderRadius: 16,
        padding: 18,
        width: 220,
        background: "#f9fafb",
        boxShadow: "0 4px 18px #a5b4fc19",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <h4 style={{ marginBottom: 14, color: "#475569", fontWeight: 600 }}>
        {product.name[lang]}
      </h4>
      {product.photo ? (
        <img
          src={product.photo}
          alt="foto producto"
          width={130}
          height={95}
          style={{
            borderRadius: 7,
            objectFit: "cover",
            marginBottom: 11,
            background: "#e0e7ef",
          }}
        />
      ) : (
        <div
          style={{
            width: 130,
            height: 95,
            background: "#edeef2",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 11,
          }}
        >
          <span style={{ color: "#b5b5b5", fontSize: 16 }}>{t("noPhoto")}</span>
        </div>
      )}

      <button
        onClick={() => deleteProduct(product.id)}
        className="card-btn-delete"
        style={{ marginTop: 7 }}
      >
        {t("delete")}
      </button>
    </div>
  );
}