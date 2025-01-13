export interface IProject {
  studentMatric: string;
  title: string;
  description: string;
  link?: string;
  date?: Date;
}

export interface IUser {
  name: string;
  lastName: string;
  matricNumber: string;
  department: string;
}
