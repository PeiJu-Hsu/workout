import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import NavBar from "./components/NavBar";
import { auth, db } from "./firebase";
import { useUserStore } from "./stores/UserStore";
import { Routes } from "./utils/Routes";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  
  }
  /* button {background-color: #000; color: #fff; margin:5px;padding: 5px;  cursor: pointer;} */

  
`;
function App() {
  const getAuth = useUserStore((state) => state.getAuth);
  const unsubscribeInvitations = useUserStore(
    (state) => state.unsubscribeInvitations,
  );
  const isLogin = useUserStore((state) => state.isLogin);
  const routing = useRoutes(Routes);

  useEffect(() => {
    getAuth(auth, db);
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
      {routing}
      {/* {isLogin && <Footer />} */}
    </>
  );
}

export default App;
