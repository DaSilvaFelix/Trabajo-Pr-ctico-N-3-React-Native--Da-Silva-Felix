export interface SubmitData {
  username?: string;
  email: string;
  password: string;
}
export interface Res {
  res: { msg: string };
  status: boolean;
}
