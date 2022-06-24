import { DbTransformFunction, TransformFunction } from '../../utils/service-utils/Outcome';
import { User, UserStatus } from './user-service';
import { hashPassword } from '../../utils/jwt';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserResponse {
  user: UserWithoutPassword;
}

export const userDocumentTransformer: DbTransformFunction<Required<User>> = () => ({
  from: (user) => {
    const status = user.status as UserStatus;
    return { ...user, ...{ status } };
  },
  to: ({ id, firstname, lastname, company, email, password, status }) => {
    const hashedPassword = hashPassword(password);
    return { id, firstname, lastname, email, company, password: hashedPassword, status };
  },
});

export const userTokenTransformer: TransformFunction<User, UserResponse> = (data: any) => ({
  to: (user: User) => {
    const { id, firstname, lastname, company, email, status } = user;

    const userWithoutPassword = {
      id,
      firstname,
      lastname,
      company,
      email,
      status,
    };

    return {
      user: userWithoutPassword,
      ...data,
    };
  },
});

export const userPostTransformer: TransformFunction<User, UserResponse> = (data: any) => ({
  to: (user: User) => {
    const { id, firstname, lastname, company, email, status } = user;

    const userWithoutPassword = {
      id,
      firstname,
      lastname,
      company,
      email,
      status,
    };

    return {
      user: userWithoutPassword,
      ...data,
    };
  },
});

export const validateUserPost = (user?: User): boolean => {
  return !(
    !user ||
    !user?.firstname ||
    !user.company ||
    !user?.lastname ||
    !user?.email ||
    !user?.password
  );
};

export const validateUserLoginPost = (user?: Partial<User>): boolean => {
  return !(!user || !user?.email || !user?.password);
};
