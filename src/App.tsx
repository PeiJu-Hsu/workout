import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
// import { Reset } from "styled-reset";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  
  }

  
`;
function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {/* <Reset /> */}
      <GlobalStyle />
      {isLogin ? <Header /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogin ? <Home /> : <SignIn />} />
        </Routes>
      </BrowserRouter>
      {isLogin ? <Footer /> : null}
    </>
  );
}

export default App;
