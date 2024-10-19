"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
async function getUserInfo(accessToken) {
    try {
        const response = await axios_1.default.get(`${process.env.AUTH0_API}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.default = getUserInfo;
//# sourceMappingURL=getUserRole.js.map