import React, { memo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage"; // it is bcz of jsoconfig.json that i can import like this , else i would have had to import like './screens/homePage';
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // oe of those things that we gotta do only one for each app, this will set up our theme
  const isAuth = Boolean(useSelector((state)=>state.token))
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth? <HomePage /> : <Navigate to={'/'}/>} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to={'/'}/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
