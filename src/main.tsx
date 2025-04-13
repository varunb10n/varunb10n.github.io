import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="font-lekton">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </main>
  </StrictMode>
);
