import { AppDispatch, AppThunk } from '@store';
import { User } from '@services/Users';
import { get, post } from '@api/Api';
import { projectorUrl } from '@services/utils';
import { Project, setCurrent, setLoading, setProject, setProjects } from '@store/project/index';

type ProjectPost = Pick<Project, 'name'>;

export const getList = () => {
  return get<Project[]>(projectorUrl('projects'));
};

export const getProjectById = (id: string) => {
  return get<Project>(projectorUrl(`projects/${id}`));
};

export const create = (project: ProjectPost) => {
  return post<Project>(projectorUrl('projects'), project);
};

export const fetchProjects = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const projects = await getList();
    dispatch(setProjects(projects));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const setCurrentProject = (id: Project['id']): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const project = await getProjectById(id);
    dispatch(setCurrent(project));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const createProject = (project: ProjectPost): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const created = await create(project);
    dispatch(setProject(created));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
