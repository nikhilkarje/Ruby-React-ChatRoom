export interface User {
  name: string;
}

export interface Room {
  id: string;
  name: string;
  users: number;
}

export interface EditUserForm {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type EditUserFormIndex = "first_name" | "last_name" | "email";

export type UserFormIndex = EditUserFormIndex | "password";
