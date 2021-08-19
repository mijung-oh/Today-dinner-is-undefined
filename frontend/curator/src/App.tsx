import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
import { listener } from "@lib/helper";

const App: React.FC = () => {
  useEffect(() => {
    listener(); // 1. listener에다가 params로 커런트 유저 닉네임을 준다.
  }, []);

  return (
    <>
      <Container>
        <BRouter></BRouter>
      </Container>
    </>
  );
};

export default App;
