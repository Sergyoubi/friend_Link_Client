import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// components to show/hide "add/remove button" on post, user list, ...
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [url, setUrl] = useState(null);

  //to control which of add or remove(friend) button to show
  const isFriend = friends.find((friend) => friend._id === friendId);
  const isPostOwner = _id === friendId;
  //function to add/remove a person in friend list
  const patchFriend = async () => {
    try {
      const response = await fetch(`${url}/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(
        `Error (${error.name}) in Friend.jsx from patchFriend()! ${error.message} `
      );
    }
  };

  useEffect(() => {
    setUrl("https://erin-lucky-mite.cyclic.app");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); // remove and check if works properly
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.72rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isPostOwner ? null : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundcolor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
