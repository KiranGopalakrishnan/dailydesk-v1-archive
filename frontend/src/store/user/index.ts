import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@services/Users';

export enum AuthenticationStatus {
  LOGGED_IN = 'LOGGED_IN',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  LOGGED_OUT = 'LOGGED_OUT',
}

export interface UserReducer {
  item: User | null;
  list: User[];
  authStatus: AuthenticationStatus | null;
  isLoading: boolean;
}

const initialState: UserReducer = {
  item: null,
  list: [],
  authStatus: null,
  isLoading: false,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.item = action.payload;
    },
    clearCurrentUser: (state, action: PayloadAction) => {
      state.item = null;
    },
    setAuthStatus: (state, action: PayloadAction<AuthenticationStatus>) => {
      state.authStatus = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, clearCurrentUser, setAuthStatus, setLoading } = counterSlice.actions;

export const userReducer = counterSlice.reducer;
