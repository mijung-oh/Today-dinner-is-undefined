import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Container, Button } from "@material-ui/core";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BRouter from "./routes/Router";
function App() {
  return (
    <>
      <Container>
        <BRouter></BRouter>
      </Container>
    </>
  );
}

export default App;
