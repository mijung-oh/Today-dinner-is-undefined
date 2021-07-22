import React, { useState, useEffect } from "react";
import "./App.css";

import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";

function App() {
  const [isAuth, setAuth] = useState<Boolean>(false);
  const [userData, setUserData] = useState<Object>({});

  useEffect(() => {
    const getUserData = async () => {
      const localUserData = await localStorage.getItem("userData");
      console.log("local", localUserData);
      if (localUserData) {
        const parsedUserData = JSON.parse(localUserData);
        setUserData(parsedUserData);
        setAuth(true);
      }
    };
    getUserData();
  }, []);

  console.log("isAuth", isAuth);
  console.log("UD", userData);
  return (
    <>
      <Container>
        <BRouter name="테스트" email="ddd"></BRouter>
      </Container>
    </>
  );
}

export default App;
