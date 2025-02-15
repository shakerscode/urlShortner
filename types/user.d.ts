export interface IUser {
  name?: string | undefined;
  email: string;
  image?: undefined | undefined;
  id: string;
  role: "user";
}
