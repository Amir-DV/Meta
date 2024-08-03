import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppAppBar from "./Components/AppAppBar"; // Adjust the path if needed
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import getLPTheme from "./getLPTheme"; // Adjust the path if needed
import { useTranslation } from "react-i18next";

function App() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lang = location.pathname.split("/")[1];
    if (lang && lang !== currentLanguage) {
      i18n.changeLanguage(lang);
    }
  }, [location.pathname, i18n, currentLanguage]);

  useEffect(() => {
    const redirectTo = localStorage.getItem("redirectTo");
    if (redirectTo) {
      localStorage.removeItem("redirectTo");
      navigate(redirectTo);
    }
  }, [navigate]);

  // Define an array of paths where the header should not be displayed
  const excludedPathsHeader = [`/${currentLanguage}/dashboard`];
  // Check if the current path is in the excluded paths
  const shouldShowHeader = !excludedPathsHeader.includes(location.pathname);

  // Define an array of paths where the footer should not be displayed
  const excludedPathsFooter = [`/${currentLanguage}/dashboard`];
  // Check if the current path is in the excluded paths
  const shouldShowFooter = !excludedPathsFooter.includes(location.pathname);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      {shouldShowHeader && (
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      )}
      <Routes>
        {/* Redirect root to default language */}
        <Route
          path="/"
          element={<Navigate to={`/${currentLanguage}`} replace />}
        />
        <Route path={`/${currentLanguage}`}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      {shouldShowFooter && <Footer />}
    </ThemeProvider>
  );
}

export default App;
