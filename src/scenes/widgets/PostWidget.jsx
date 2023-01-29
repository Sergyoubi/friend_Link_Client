import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  postPicturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [comment, setComment] = useState("");
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const { firstName, lastName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // check if the loggedin user has liked a particular post or not. will return true or false
  const isPostLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;

  // fn() to increase/decrease the number of a One Post's Like
  const patchLike = async () => {
    try {
      const response = await fetch(
        `https://erin-lucky-mite.cyclic.app/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(
        `Error (${error.name}) from PostWidget.jsx/patchLike()! ${error.message} `
      );
    }
  };

  const handleComment = async () => {
    try {
      setIsPending(true);
      const response = await fetch(
        `https://erin-lucky-mite.cyclic.app/posts/${postId}/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
            name: `${firstName} ${lastName}`,
          }),
        }
      );
      if (response) {
        setIsPending(false);
      }
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setComment("");
    } catch (error) {
      console.error(
        `Error (${error.name}) from PostWidget.jsx/handleComment()! ${error.message} `
      );
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {postPicturePath ? (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://erin-lucky-mite.cyclic.app/assets/${postPicturePath}`}
        />
      ) : null}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* like section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isPostLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* comment section */}
          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <FlexBetween gap="1rem">
        <InputBase
          placeholder="Write comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: "80%",
            height: "2.7rem",
            borderRadius: "2rem",
            padding: "1rem 2rem",
            backgroundColor: palette.neutral.light,
          }}
        />
        <Button
          disabled={!comment || isPending}
          onClick={handleComment}
          sx={{
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#0ea5e9",
            },
            borderRadius: "3rem",
            backgroundColor: "#38bdf8",
          }}
        >
          <Typography color="#ffffff">
            {isPending ? "Add...." : "Add"}
          </Typography>
        </Button>
      </FlexBetween>
      {isComments ? (
        <Box mt="0.27rem">
          {comments.map((item) => (
            <Box
              key={`${item.name}-${item.comment}`}
              sx={{
                width: "80%",
                padding: "0.8rem 2rem",
                backgroundColor: { dark },
              }}
            >
              <Typography color={dark} sx={{ fontWeight: "bold" }}>
                {item.name}
              </Typography>
              <Typography color={dark} sx={{ m: "0.5rem 0", pl: "1rem" }}>
                {item.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </WidgetWrapper>
  );
};

export default PostWidget;
