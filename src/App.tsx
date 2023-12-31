import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import NavBar from './components/NavBar';
import { InBodyStore } from './stores/InBodyStore';
import { useUserStore } from './stores/UserStore';
import { Routes } from './utils/Routes';
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  background-color: #000000;
  }`;
function App() {
    const getCurrentUserInfo = useUserStore(
        (state) => state.getCurrentUserInfo
    );
    const fetchInBodyData = InBodyStore((state) => state.fetchInBodyData);
    const unsubscribeInvitations = useUserStore(
        (state) => state.unsubscribeInvitations
    );
    const isLogin = useUserStore((state) => state.isLogin);
    const routing = useRoutes(Routes);
    useEffect(() => {
        getCurrentUserInfo();
        fetchInBodyData();
        unsubscribeInvitations();
        return () => {
            unsubscribeInvitations();
        };
    }, [isLogin]);
    return (
        <>
            <GlobalStyle />
            {isLogin && <NavBar />}
            <Toaster />
            {routing}
        </>
    );
}

export default App;
