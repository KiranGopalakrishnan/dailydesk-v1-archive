import { post } from '../api/Api';
import { projectorUrl } from './utils';

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  password: string;
}
