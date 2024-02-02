import { createSlice } from "@reduxjs/toolkit";

// Check if there's a user session stored in the browser's sessionStorage
const storedUser = sessionStorage.getItem("user");
const initialState = storedUser
  ? JSON.parse(storedUser)
  : {
      email: "",
      firstName: "",
      image: "",
      lastName: "",
      _id: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      // Update the user state
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;

      // Save the user session in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(state));
    },
    logoutRedux: (state, action) => {
      // Clear the user state and remove it from sessionStorage
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
