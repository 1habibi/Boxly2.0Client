import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./styles/index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Login } from "@/pages/Login/Login.jsx";

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);
