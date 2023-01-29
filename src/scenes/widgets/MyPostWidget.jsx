// this is where posts are created.
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  // isImage will represent a switch if wether user clicked a button to open a place to drop image for his post
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      // a post may contain image or not so we check it here
      if (image) {
        formData.append("picture", image);
        formData.append("postPicturePath", image.name);
      }

      const response = await fetch("https://erin-lucky-mite.cyclic.app/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      // the entire posts will be returned from back-end after a post is created
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      // reset state after we make an API call
      setPost("");
    } catch (error) {
      console.error(
        `Error (${error.name}) from MyPostWidget.jsx/handlePost()! ${error.message} `
      );
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            height: "50%",
            borderRadius: "2rem",
            padding: "1rem 2rem",
            backgroundColor: "#F0F0F0",
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            "&:hover": {
              cursor: "pointer",
              backgroundcolor: "#60a5fa",
            },
            borderRadius: "3rem",
            backgroundColor: "#38bdf8",
          }}
        >
          <Typography
            color="#f1f5f9"
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            POST
          </Typography>
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
