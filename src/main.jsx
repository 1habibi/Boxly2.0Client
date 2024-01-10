import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./styles/index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
