
import React, { createContext, useContext, useState } from 'react';

// Creating the context
const SearchContext = createContext();

// A custom hook to use the context
export const useSearch = () => useContext(SearchContext);

// The provider component that wraps the rest of the app
export const SearchProvider = ({ children }) => {
  const [name, setName] = useState(''); // State and setter for search term


  return (
    <SearchContext.Provider value={{ name, setName }}>
      {children}
    </SearchContext.Provider>
  );
};
// custom hook