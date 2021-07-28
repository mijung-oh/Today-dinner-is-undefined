import React from "react";

import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
import Appbar from "@components/Appbar";

function App() {
  return (
    <>
      <Appbar />
      <Container>
        <BRouter></BRouter>
      </Container>
    </>
  );
}

export default App;
