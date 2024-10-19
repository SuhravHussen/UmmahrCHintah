import { IUser } from "@/interfaces/User.interface";

const hasDashboardAccess = (userObj = {}) => {
  if (Object.keys(userObj).length === 0) return false;
  const typedUser = userObj as IUser;
  const doesRolesExist = typedUser["/roles"];
  const isModerator = doesRolesExist.includes("moderator");
  const isAdmin = doesRolesExist.includes("admin");

  return isModerator || isAdmin;
};

export default hasDashboardAccess;
