import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./styles/index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { setCredentials } from "@/features/auth/authSlice.js";
import { LoadAuth } from "@/copmonents/shared/LoadAuth/LoadAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#E56427",
      },
      components: {
        Menu: {
          colorBgContainer: "inherit",
        },
      },
    }}
  >
    <Provider store={store}>
      <LoadAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadAuth>
    </Provider>
  </ConfigProvider>
);
