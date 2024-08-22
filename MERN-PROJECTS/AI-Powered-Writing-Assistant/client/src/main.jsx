import React from "react";
import ReactDOM from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PrivyProvider
        appId="cm03yi7zl02fele5dgq4hg63k"
        config={{
          // Display email and wallet as login methods
          loginMethods: ["email", "wallet", "sms", "google", "github", "apple"],
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "https://res.cloudinary.com/tweneboah/image/upload/v1724251495/Masynctech_Logo_3_rzmg8h.png",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <App />
      </PrivyProvider>
    </Provider>
  </React.StrictMode>
);
