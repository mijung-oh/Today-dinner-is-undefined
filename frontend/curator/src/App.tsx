import React from "react";
import "./App.css";

import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
import history from "utils/history";
function App() {
  return (
    <div className="root">
      <Container>
        <BRouter></BRouter>
      </Container>
    </div>
  );
}

export default App;
