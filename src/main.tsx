import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Simple, standard mount logic. 
// If there's content inside, hydrate. Otherwise, create fresh root.
if (rootElement.innerHTML.trim().length > 0) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
