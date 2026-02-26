export interface IProject {
  studentMatric: string;
  title: string;
  description: string;
  link?: string;
  date?: Date;
  votes?: number;
  documentation?: string;
  pdfDocument?: string; // URL or path to PDF document
  pdfFileName?: string; // Original filename
}

export interface IUser {
  name: string;
  lastName: string;
  matricNumber: string;
  password: string;
  department: string;
}
