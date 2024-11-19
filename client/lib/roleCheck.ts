import { IUser } from "@/interfaces/User.interface";

const checkRole = (userObj = {}, role: string) => {
  if (Object.keys(userObj).length === 0) return false;
  const typedUser = userObj as IUser;
  const doesRolesExist = typedUser["/roles"];
  return doesRolesExist.includes(role);
};

export default checkRole;
