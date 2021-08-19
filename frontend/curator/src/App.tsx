import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import BRouter from "./routes/Router";
import { listener } from "@lib/helper";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import "./index.scss";
const App: React.FC = () => {
  useEffect(() => {
    listener(); // 1. listener에다가 params로 커런트 유저 닉네임을 준다.
  }, []);

  const THEME = createTheme({
    typography: {
      fontFamily: "Chosunilbo_myungjo",
    },
  });

  return (
    <>
      <MuiThemeProvider theme={THEME}>
        <Container>
          <BRouter></BRouter>
        </Container>
      </MuiThemeProvider>
    </>
  );
};

export default App;
