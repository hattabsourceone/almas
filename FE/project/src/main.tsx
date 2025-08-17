import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./components/context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { SelectedDiamondContextProvider } from "@components/context/SelectedDiamondContext.tsx";
import { CartProvider } from "@components/context/cartProvider.tsx";
import * as Sentry from "@sentry/react";

/* Sentry.init({
  dsn: "https://ba941fbcaca9457d725e986ee0993e71@o4506515194642432.ingest.us.sentry.io/4507885261619200",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
}); */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SelectedDiamondContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </SelectedDiamondContextProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
