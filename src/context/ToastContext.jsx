import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-25 right-5 z-50 space-y-2">
       {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border-l-4 border-orange-500 text-gray-800 px-6 py-4 rounded-xl shadow-md transition transform duration-300 animate-slide-in"
          >
            <p className="font-semibold">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

