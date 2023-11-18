import { useRoutes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
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
  const isLogin = useUserStore((state) => state.isLogin);
  const routing = useRoutes(Routes);
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
