import { createSlice } from '@reduxjs/toolkit';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
