import { useRoutes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { auth, db } from "../src/firebase";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useUserStore } from "./stores/UserStore";
import { Routes } from "./utils/Routes";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  
  }

  
`;
function App() {
  const getAuth = useUserStore((state) => state.getAuth);
  const isLogin = useUserStore((state) => state.isLogin);
  const routing = useRoutes(Routes);
  getAuth(auth, db);
  return (
    <>
      <GlobalStyle />
      {isLogin && <Header />}
      {routing}
      {isLogin && <Footer />}
    </>
  );
}

export default App;
