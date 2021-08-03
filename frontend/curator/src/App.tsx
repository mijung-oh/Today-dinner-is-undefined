import React from "react";
import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
const App: React.FC = () => {
  return (
    <>
      <Container>
        <BRouter></BRouter>
      </Container>
    </>
  );
};

export default App;
