import { createSlice, createAction } from "@reduxjs/toolkit";

// Prepare actions to ensure payloads are serializable
const getAllTweets = createAction('tweet/getAllTweets', (tweets) => {
  return {
    payload: tweets,
  };
});

const getRefresh = createAction('tweet/getRefresh');

const getIsActive = createAction('tweet/getIsActive', (isActive) => {
  return {
    payload: isActive,
  };
});

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    refresh: false,
    isActive: true,
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

// Combine the slice actions with the prepared actions
export const { getAllTweets: getAllTweetsAction, getRefresh: getRefreshAction, getIsActive: getIsActiveAction } = tweetSlice.actions;
export { getAllTweets, getRefresh, getIsActive };
export default tweetSlice.reducer;
