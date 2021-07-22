import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TestPage from "@pages/TestPage";
import TestCompo from "@components/TestCompo";
import { Container, Button } from "@material-ui/core";

function App() {
  return (
    <Container>
      <TestPage></TestPage>
      <TestCompo></TestCompo>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </Container>
  );
}

export default App;
