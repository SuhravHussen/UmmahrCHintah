"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyObj(value) {
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
    }
    return false;
}
exports.default = isEmptyObj;
//# sourceMappingURL=isEmptyObj.js.map