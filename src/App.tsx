import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import NavBar from "./components/NavBar";
import { useUserStore } from "./stores/UserStore";
import { Routes } from "./utils/Routes";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  }`;
function App() {
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);
  const unsubscribeInvitations = useUserStore(
    (state) => state.unsubscribeInvitations,
  );
  const isLogin = useUserStore((state) => state.isLogin);
  const routing = useRoutes(Routes);
  useEffect(() => {
    getCurrentUserInfo();
    unsubscribeInvitations();
    return () => {
      unsubscribeInvitations();
    };
  }, []);
  return (
    <>
      <GlobalStyle />
      {isLogin && (
        <>
          <NavBar />
        </>
      )}
      <Toaster />
      {routing}
      {/* {isLogin && <Footer />} */}
    </>
  );
}

export default App;
