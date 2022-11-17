import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import firebaseInit from "./firebase";

console.log(firebaseInit);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
