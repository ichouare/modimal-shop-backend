"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = setCookies;
function setCookies(res, accessToken, refreshToken) {
    if (accessToken) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
    }
    if (refreshToken) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000, // 1day
        });
    }
}
