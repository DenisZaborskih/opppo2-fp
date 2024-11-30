import React from "react";
import * as ReactDOMClient from "react-dom/client";
import AppComponent from "./App";

const app = document.querySelector(".app");
const newApp = ReactDOMClient.createRoot(app);

newApp.render(<AppComponent/>);
