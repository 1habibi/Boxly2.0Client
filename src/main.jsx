import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import "./styles/index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { LoadAuth } from "@/utils/LoadAuth/LoadAuth.jsx";
import { IKContext } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/image-kit/auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

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
          <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
          >
            <App />
          </IKContext>
        </BrowserRouter>
      </LoadAuth>
    </Provider>
  </ConfigProvider>
);
