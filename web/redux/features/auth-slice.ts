import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from 'nookies';

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
      setCookie(null, 'auth.token', action.payload.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      setCookie(null, 'auth.token', '', {
        maxAge: -1,
        path: '/',
      });
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
