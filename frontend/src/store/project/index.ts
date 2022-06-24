import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  companyId: string;
  createdBy: string;
}

export interface ProjectReducer {
  current: Project | null;
  item: Project | null;
  list: Project[];
  isLoading: boolean;
}

const initialState: ProjectReducer = {
  current: null,
  item: null,
  list: [],
  isLoading: false,
};

export const projectSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload;
    },
    setCurrent: (state, action: PayloadAction<Project>) => {
      state.current = action.payload;
    },
    setProject: (state, action: PayloadAction<Project>) => {
      state.list = state.list.concat([action.payload]);
      state.item = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjects, setProject, setCurrent, setLoading } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
