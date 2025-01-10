export interface IProject extends Document {
  studentMatric: string;
  title: string;
  description: string;
  link?: string;
  date?: Date;
}

export interface IUser extends Document {
  name: string;
  lastName: string;
  matricNumber: string;
  department: string;
}
