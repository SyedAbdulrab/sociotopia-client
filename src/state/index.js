import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};
// this data will be accesible throught our app and we wont have to pass state down through props and stuff

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // these are just functions that are used to modify the state
  reducers: {
    setMode: (state) => {
      // redux has this idea that u cant oify this state directly but toolkit allows u to modify the state directly even though under the hood this not exactly what happens
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // action is simply the parameters
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
        console.log('logging out...');
      // when u hit logout were gonna set this to have nthg in there
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      console.log("SET POST State:->  ", state,"ACTION:   ",action)
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
