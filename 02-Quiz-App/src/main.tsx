import ReactDOM from "react-dom/client";
import store from "./Redux/store.ts";
import App from "./App.tsx";
import React from "react";
import "./styles/index.css";

import { QuestionsProvider } from "./context/QuizContext.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QuestionsProvider>
        <App />
        <Toaster />
      </QuestionsProvider>
    </Provider>
  </React.StrictMode>
);
