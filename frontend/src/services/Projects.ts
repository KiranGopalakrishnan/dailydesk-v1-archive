import { Project } from '@store/project';
import { get, post } from '../api/Api';
import { projectorUrl } from './utils';

const createProject = (project: Project) => {
  return post<Project>(projectorUrl('projects'), project);
};

const getProjects = (project: Project) => {
  return get<Project>(projectorUrl('projects'));
};

export { createProject };
