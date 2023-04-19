import { useTheme } from "@emotion/react";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import React from "react";
import { Typography } from "@mui/material";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width={"100%"}
        height={"auto"}
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>SE-12 Cosmetikas</Typography>
        <Typography color={medium}>se12cosmeticas.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        "Shining in the settng sun like a pearl upon the ocean" would be how you
        would describe your skin after using our products. ^0^
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
