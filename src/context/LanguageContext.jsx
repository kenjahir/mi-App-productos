import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  es: {
    selectLanguage: "Seleccionar idioma",
    products: "Productos",
    addProduct: "Agregar producto",
    productName: "Nombre del producto",
    productNameEN: "Nombre en inglés",
    productNameES: "Nombre en español",
    takePhoto: "Tomar/Cargar foto",
    chooseFile: "Elegir archivo",
    noPhoto: "Sin foto",
    add: "Agregar",
    enterProductName: "Ingrese el nombre",
    enterProductNameEN: "Ingrese el nombre en inglés",
    enterProductNameES: "Ingrese el nombre en español",
    delete: "Eliminar",
    required: "Este campo es obligatorio",
    noProducts: "No hay productos agregados"
  },
  en: {
    selectLanguage: "Select language",
    products: "Products",
    addProduct: "Add product",
    productName: "Product name",
    productNameEN: "Name in English",
    productNameES: "Name in Spanish",
    takePhoto: "Take/Upload photo",
    chooseFile: "Choose file",
    noPhoto: "No photo",
    add: "Add",
    enterProductName: "Enter name",
    enterProductNameEN: "Enter name in English",
    enterProductNameES: "Enter name in Spanish",
    delete: "Delete",
    required: "This field is required",
    noProducts: "No products added"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");
  const t = (key) => translations[lang][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}