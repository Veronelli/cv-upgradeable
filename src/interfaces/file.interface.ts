export interface FileDTO {
  name: string;
  version: string;
  description: string;
}
export interface IFile {
  name: string;
  path?: string;
  version: string;
  description: string;
  createdAt: string;
  fileName: string;
}

export interface User {
  name: string;
  password: string;
}
