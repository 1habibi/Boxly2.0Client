import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./styles/index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { LoadAuth } from "@/utils/LoadAuth/LoadAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#E56427",
        // colorError: "#ff0000",
        colorAccent: "#1E796A",
        colorDark: "#031D2A",
      },
      components: {
        Menu: {
          colorBgContainer: "inherit",
        },
        Alert: {
          defaultPadding: "10px 12px",
        },
        Layout: {
          footerBg: "inherit",
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
