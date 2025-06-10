import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <HeroUIProvider>
          <ToastProvider />
          <main className="text-foreground bg-background">
            <App />
          </main>
        </HeroUIProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);