/*import { useState, useContext, createContext, useEffect } from "react";

const CategoryContext = createContext();

const safeParse = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(() => {
    const existingCategoryItem = localStorage.getItem("category");
    return existingCategoryItem ? safeParse(existingCategoryItem) : [];
  });

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};

// custom hook
const useCategorySelect = () => useContext(CategoryContext);

export { useCategorySelect, CategoryProvider };
*/
import { useState, useContext, createContext, useEffect, useMemo } from "react";

const CategoryContext = createContext();

// Funcție de parsare sigură a JSON-ului
const safeParse = (data) => {
  try {
    return JSON.parse(data) || []; // Dacă parsingul eșuează, întoarce un array gol
  } catch {
    return []; // Dacă apare o eroare, întoarce un array gol
  }
};

const CategoryProvider = ({ children }) => {
  // Inițializare sigură folosind useMemo pentru a preveni recalculări
  const initialCategory = useMemo(() => {
    return safeParse(localStorage.getItem("category"));
  }, []);

  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const storedCategory = localStorage.getItem("category");
    if (JSON.stringify(category) !== storedCategory) {
      localStorage.setItem("category", JSON.stringify(category));
    }
  }, [category]);

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook pentru acces mai ușor la context
const useCategorySelect = () => useContext(CategoryContext);

export { useCategorySelect, CategoryProvider };
