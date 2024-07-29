import { createSlice, createAction } from "@reduxjs/toolkit";

// Prepare action for followingUpdate to ensure payload is serializable
const followingUpdate = createAction('user/followingUpdate', (userId) => {
  return {
    payload: {
      userId,
    },
  };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      following: []
    },
    otherUsers: [],
    profile: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    // Use the prepare action to manage following updates
    followingUpdate: (state, action) => {
      const { userId } = action.payload;
      if (state.user.following.includes(userId)) {
        state.user.following = state.user.following.filter((itemId) => itemId !== userId);
      } else {
        state.user.following.push(userId);
      }
    },
  },
});

// Extract and export each action creator by name
export const { getUser, getOtherUsers, getMyProfile } = userSlice.actions;
export { followingUpdate };
export default userSlice.reducer;
