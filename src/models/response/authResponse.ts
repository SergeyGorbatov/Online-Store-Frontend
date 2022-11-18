import { IUser } from "models/IUser";

export interface authResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
