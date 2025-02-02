import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/userContext.tsx";
import QueryProvider from "../src/api/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </UserProvider>
  </StrictMode>
);
