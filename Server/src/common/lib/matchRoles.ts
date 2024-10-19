import { Role } from '../interfaces/roles.interface';

function matchRoles(decoratorRoles: Role[], dbRoles: string[]): boolean {
  // Normalize roles by trimming whitespace and converting to lowercase
  const normalizedDbRoles = dbRoles.map((role) => role.trim().toLowerCase());
  const normalizedDecoratorRoles = decoratorRoles.map((role) =>
    role.trim().toLowerCase(),
  );

  // Check if user has admin role in the database
  const isUserAdmin = normalizedDbRoles.includes('admin');

  // If user is admin, they have access to everything
  if (isUserAdmin) {
    return true;
  }

  // If decorator requires admin but user is not admin, deny access
  if (normalizedDecoratorRoles.includes('admin')) {
    return false;
  }

  // Check if any of the user's roles match the decorator roles
  return normalizedDbRoles.some((role) =>
    normalizedDecoratorRoles.includes(role),
  );
}

export default matchRoles;
