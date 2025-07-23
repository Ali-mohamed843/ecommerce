import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); 

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "EGP" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
