import React, { createContext, useContext, useState } from "react";

// Productos iniciales
const initialProducts = [
  { id: 1, name: { es: "Manzana", en: "Apple" }, photo: null },
  { id: 2, name: { es: "Banana", en: "Banana" }, photo: null },
  { id: 3, name: { es: "Naranja", en: "Orange" }, photo: null }
];

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  // Agregar producto
  const addProduct = (name) => {
    const id = Date.now();
    setProducts([...products, { id, name, photo: null }]);
  };

  // Eliminar producto
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Guardar/cambiar foto
  const setProductPhoto = (id, photoUrl) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, photo: photoUrl } : p
    ));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, setProductPhoto }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}