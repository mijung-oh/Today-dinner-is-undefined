import React from "react";

import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
import { useEffect } from "react";
import { useState } from "react";
const App: React.FC = () => {
  const [isAuth, setAuth] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user && user.length > 0) {
      setAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <Container>
        <BRouter></BRouter>
      </Container>
    </>
  );
};

export default App;
