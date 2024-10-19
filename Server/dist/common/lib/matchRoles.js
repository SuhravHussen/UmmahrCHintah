"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchRoles(decoratorRoles, dbRoles) {
    const normalizedDbRoles = dbRoles.map((role) => role.trim().toLowerCase());
    const normalizedDecoratorRoles = decoratorRoles.map((role) => role.trim().toLowerCase());
    const isUserAdmin = normalizedDbRoles.includes('admin');
    if (isUserAdmin) {
        return true;
    }
    if (normalizedDecoratorRoles.includes('admin')) {
        return false;
    }
    return normalizedDbRoles.some((role) => normalizedDecoratorRoles.includes(role));
}
exports.default = matchRoles;
//# sourceMappingURL=matchRoles.js.map