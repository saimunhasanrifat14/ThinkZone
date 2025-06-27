import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import database from "./Firebase/firebase.config.js";
import { Provider } from "react-redux";
import { store } from "./Features/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
