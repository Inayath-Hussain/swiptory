import { RequestHandler } from "express";

import { Ierror } from "../../controllers/errorHandler";
import { expireAccessTokenCookie, signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { expireRefreshTokenCookie, signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { createAccessToken, verifyAccessToken } from "../../utilities/tokens/accessToken";
import { renewRefreshToken } from "../../utilities/tokens/refreshToken";
import { validateAuthTokens } from "../../utilities/tokens/validateAuthTokens";
import { userService } from "../../services/user";


export const authMiddleware: RequestHandler = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies

    // if no auth tokens are present, send 401 response
    if (!accessToken && !refreshToken) return next({ statusCode: 401, message: "Authentication tokens required" } as Ierror)

    // set's empty cookie values for access and refresh tokens and send 401 response 
    const invalidResponse = () => {
        expireAccessTokenCookie(res)
        expireRefreshTokenCookie(res)

        return next({ statusCode: 401, message: "Invalid authentication tokens" } as Ierror)
    }


    // get user id from db
    const _getUserId = async (username: string) => {
        const userDoc = await userService.getUser(username);
        if (userDoc === null) return null;

        return userDoc._id.toString();
    }


    // if only access token is present then verify and continue
    if (!refreshToken) {
        const result = await verifyAccessToken(accessToken);

        // if token is invalid then send 401 response
        if (!result.valid) return invalidResponse();


        const user_id = await _getUserId(result.payload.username);
        if (user_id === null) return invalidResponse();

        // add username to request
        req.user_id = user_id;
        return next();
    }


    // if only refresh token is present then validate and renew if needed and create new access token
    if (!accessToken) {
        // validate and renew token if necessary
        const result = await renewRefreshToken(refreshToken)

        // if token is invalid return 401 response
        if (!result.valid) return invalidResponse();

        // create access token
        const newAccessToken = await createAccessToken({ username: result.username })


        const user_id = await _getUserId(result.username)
        if (user_id === null) return invalidResponse();

        req.user_id = user_id;

        // create cookies
        signAccessTokenCookie(res, newAccessToken)
        if (result.newToken) signRefreshTokenCookie(res, result.refreshToken)

        return next();
    }


    // if both tokens are present then validate and renew refresh token if needed
    const result = await validateAuthTokens(accessToken, refreshToken)

    if (!result.valid) return invalidResponse();

    const user_id = await _getUserId(result.username);
    if (user_id === null) return invalidResponse();


    req.user_id = user_id;

    result.newTokens.forEach(tokenName => {
        if (tokenName === "accessToken") signAccessTokenCookie(res, result.accessToken)
        if (tokenName === "refreshToken") signRefreshTokenCookie(res, result.refreshToken)
    })

    next();
}