import {
  Box,
  Select,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import {

  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // this allows us to know if the current screen is less than the specified min width
  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullname = user ? `${user.firstName} ${user.lastName}` : "Syed Abdulrab";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          fontWeight="bold"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            // this is where u put css properties that are like sudo properties or sth
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociotopia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullname}>
            <Select
              sx={{
                backgroundColor: neutralLight,
                // this is the class name, yll have to inspect to find this out
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                p: "0.25rem 1rem",
                width: "150px",
              }}
              input={<InputBase />}
              value={fullname}
            >
              <MenuItem value={fullname}>
                <Typography>{fullname}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography>Logout</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled((prevState) => !prevState)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box position={"fixed"} 
        right={0} 
        bottom={0}
        height={"100%"}
        zIndex={10}
        maxWidth={"500px"}
        minWidth={"300px"}
        backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display={'flex'} justifyContent={'flex-end'} p='1rem'>
            <IconButton onClick={() => setIsMobileMenuToggled((prevState) => !prevState)}>
              <Close/>
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap="3rem">
          <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullname}>
            <Select
              sx={{
                backgroundColor: neutralLight,
                // this is the class name, yll have to inspect to find this out
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                p: "0.25rem 1rem",
                width: "150px",
              }}
              input={<InputBase />}
              value={fullname}
            >
              <MenuItem value={fullname}>
                <Typography>{fullname}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography>Logout</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>

        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
