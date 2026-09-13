import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "./context/RouterContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>
);
