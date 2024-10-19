import { UserProfile } from "@auth0/nextjs-auth0/client";

export interface IUser extends UserProfile {
  "/roles": string[];
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}
