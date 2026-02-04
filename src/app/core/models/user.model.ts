export interface User {
  userId: string;
  name: string;
  role: Role;
  email: string;
  password: string;
}
export enum Role {
  USER = 1,
  SUPPORT_ENGINEER = 2,
  SUPERVISOR = 3
}
