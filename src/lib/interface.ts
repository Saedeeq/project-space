export interface IProject {
  studentMatric: string;
  title: string;
  description: string;
  link?: string;
  date?: Date;
  votes?: number;
  documentation?: string;
}

export interface IUser {
  name: string;
  lastName: string;
  matricNumber: string;
  password: string;
  department: string;
}
