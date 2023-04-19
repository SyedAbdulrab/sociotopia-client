import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  VerifiedRounded,
  Verified,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isAbdulrab = userId === "643da2ab574ad98649483128";
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
    viewedProfile,
    impressions,
    friends,
    location,
    occupation,
  } = user;

  return (
    <Fragment>
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap={"0.6rem"}
          pb={"1.1rem"}
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap={"1rem"}>
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={"dark"}
                fontWeight={"500"}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              {isAbdulrab ? (
                <Typography mt={"0px"} color={medium}>
                  Verified Account <Verified />{" "}
                </Typography>
              ) : null}
              <Typography color={"medium"}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
        <Divider />

        {/* SECOND ROW */}
        <Box p={"1rem 0"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            mb={"0.5rem"}
          >
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
        <Divider />
        {/* THIRD ROW */}
        <Box p={"1rem 0"}>
          <FlexBetween mb={"0.5rem"}>
            <Typography color={medium}>Whos Viewed your profile</Typography>
            <Typography color={main}>{viewedProfile}</Typography>
          </FlexBetween>
          <FlexBetween mb={"0.5rem"}>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main}>{impressions}</Typography>
          </FlexBetween>
        </Box>
        <Divider />
        {/* FOURTH ROW */}

        <Box p={"1rem 0"}>
          <Typography
            fontSize="1rem"
            color={main}
            fontWeight={"500"}
            mb={"1rem"}
          >
            Social Profiles
          </Typography>

          <FlexBetween gap={"1rem"}>
            <FlexBetween gap={"1rem"}>
              <img src="../../../public/assets/twitter.png" />
              <Box>
                <Typography color={main} fontWeight={"500"}>
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween mb={"0.5rem"} gap={"1rem"}>
            <FlexBetween gap={"1rem"}>
              <img src="../../../public/assets/linkedin.png" />
              <Box>
                <Typography color={main} fontWeight={"500"}>
                  LinkedIn
                </Typography>
                <Typography color={medium}>Social Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    </Fragment>
  );
};

export default UserWidget;
