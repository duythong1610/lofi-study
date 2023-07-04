import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  birthday: "",
  avatar: "",
  access_token: "",
  id: "",
  isAdmin: false,
  refreshToken: "",
  createdAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        firstName = "",
        lastName = "",
        email = "",
        gender = "",
        birthday = "",
        access_token = "",
        avatar = "",
        _id = "",
        isAdmin,
        refreshToken = "",
        createdAt,
      } = action.payload;
      state.firstName = firstName ? firstName : state.firstName;
      state.lastName = lastName ? lastName : state.lastName;
      state.email = email ? email : state.email;
      state.gender = gender ? gender : state.gender;
      state.birthday = birthday ? birthday : state.birthday;
      state.avatar = avatar ? avatar : state.avatar;
      state.id = _id ? _id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
      state.createdAt = createdAt ? createdAt : state.createdAt;
    },
    resetUser: (state) => {
      state.id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.gender = "";
      state.birthday = "";
      state.avatar = "";
      state.access_token = "";
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
