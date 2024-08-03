import React from "react";
import { Menu, MenuItem, Button, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import enFlag from "./Assets/Flags/EN.svg";
import frFlag from "./Assets/Flags/FR.svg";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    document.body.style.paddingRight = "";
  };

  const handleClose = (lang) => {
    setAnchorEl(null);
    document.body.style.paddingRight = "";
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = lang; // Replace the language segment
    const newPath = pathSegments.join("/");
    i18n.changeLanguage(lang);
    navigate(newPath);
  };

  const languageMap = {
    en: { name: "English", flag: enFlag },
    fr: { name: "French", flag: frFlag },
    // Add more languages here if needed
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          gap: 1,
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box
          component="img"
          src={languageMap[currentLanguage].flag}
          alt={currentLanguage}
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
          }}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
            color: "text.primary",
          }}
        >
          {currentLanguage.toUpperCase()}
        </Typography>
        <ArrowDropDownIcon
          sx={{
            transition: "transform 0.3s",
            transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        disableScrollLock
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            mt: 1,
            minWidth: "160px",
          },
        }}
      >
        {Object.keys(languageMap).map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => handleClose(lang)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box
              component="img"
              src={languageMap[lang].flag}
              alt={lang}
              sx={{
                width: 24,
                height: 24,
                marginRight: 1,
                borderRadius: "50%",
              }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                color: "text.primary",
              }}
            >
              {languageMap[lang].name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
