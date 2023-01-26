// this is where posts are created.
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  // isImage will represent a switch if wether user clicked a button to open a place to drop image for his post
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl("https://erin-lucky-mite.cyclic.app");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      const response = await fetch(`${url}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      // the entire posts will be returned from back-end after a post is created
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      // reset state after we make an API call
      setImage(null);
      setIsImage(!isImage);
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
      {isImage ? (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpeg, .jpg, .png"
            multiple={false}
            //image is set here
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      ) : null}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
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
