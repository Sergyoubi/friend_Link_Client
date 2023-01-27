import { LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// This is where the user info are displayed
const UserWidget = ({ userId, picturePath }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(
        `Error ${error.name} from UserWidget.jsx/getUserInfo()! ${error.message}`
      );
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // "user" doesn't exist until getUserInfo() returns data! destructuring the "user object" will return an error if not checked like bellow
  if (!user) return null;

  const { firstName, lastName, location, occupation, friends } = user;

  return (
    <WidgetWrapper>
      {/* 1st row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.neutral.mediumMain,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {/* 
        <ManageAccountsOutlined />
        */}
      </FlexBetween>

      <Divider />

      {/* 2nd Row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* 3rd Row */}
      {/* 
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions on your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      */}
      {/* 4th ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <TwitterIcon sx={{ color: medium }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {/* 
          <EditOutlined sx={{ color: main }} />
          */}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedInIcon sx={{ color: medium }} />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {/* 
          <EditOutlined sx={{ color: main }} />
          */}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
