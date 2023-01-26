import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [url, setUrl] = useState(null);

  //get all post
  const getPosts = async () => {
    try {
      const response = await fetch(`${url}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(
        `Error (${error.name}) from PostsWidget.jsx/getPosts())! ${error.message} `
      );
    }
  };

  // get one user posts
  const getUserPosts = async () => {
    try {
      const response = await fetch(`${url}/posts/${userId}/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(
        `Error (${error.name}) from PostsWidget.jsx in getUserPosts()! ${error.message} `
      );
    }
  };

  useEffect(() => {
    setUrl("https://erin-lucky-mite.cyclic.app");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      //news feed
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          postPicturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            postPicturePath={postPicturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
