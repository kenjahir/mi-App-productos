import { LanguageProvider } from "./context/LanguageContext";
import { ProductProvider } from "./context/ProductContext";
import LanguageSelector from "./components/LanguageSelector";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import "./index.css";

export default function App() {
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
            <LanguageSelector />
            <AddProductForm />
            <ProductList />
          </div>
        </div>
      </ProductProvider>
    </LanguageProvider>
  );
}