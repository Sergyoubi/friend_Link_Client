import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      // all posts
      state.posts = action.payload.posts.reverse();
    },
    //action to control a single post
    setPost: (state, action) => {
      // map to all previous stored posts, then we compare all previous posts's Id with the Id of a post from action.payload! if Id matches return this single post, if not return them all.
      const updatedPost = state.posts.map((post) => {
        if (action.payload.post._id === post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPost;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
