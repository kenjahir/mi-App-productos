import { useProducts } from "../context/ProductContext";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products } = useProducts();
  const { t } = useLanguage();

  return (
    <div>
      <h2 style={{
        marginBottom: 25,
        color: "#1e293b",
        letterSpacing: "1px",
        fontWeight: 800,
        fontSize: 28,
        textAlign: "center"
      }}>{t("products")}</h2>
      {products.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center" }}>{t("noProducts")}</p>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center"
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}