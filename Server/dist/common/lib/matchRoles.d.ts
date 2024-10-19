import { Role } from '../interfaces/roles.interface';
declare function matchRoles(decoratorRoles: Role[], dbRoles: string[]): boolean;
export default matchRoles;
