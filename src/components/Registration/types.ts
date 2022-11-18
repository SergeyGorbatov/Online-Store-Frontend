import { typeUserRegistration } from "types";

export interface IFormInputs {
  nameInput: typeof typeUserRegistration;
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
  address: string;
}
