import React from "react";
import { render } from "react-dom";
import AppRouter from "./routers/AppRouter";
import "./styles/styles.scss";
const App = () => <AppRouter />;
render(<App />, document.getElementById("app"));
