import { UseFormRegister, FieldValues } from "react-hook-form";

export interface InputProps {
  placeholder: string;
  nameInput:
    | "name"
    | "surname"
    | "email"
    | "password"
    | "repeatPassword"
    | "phone"
    | "address";
  register: UseFormRegister<FieldValues>;
  type: string;
  id: string;
  errors: any;
}
