import { RequestHandler } from "express";

import { IAuthRequestBody } from "../../middlewares/user/validateAuthRequestBody";
import { userService } from "../../services/user";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";

export const registerController: RequestHandler<{}, {}, IAuthRequestBody> = async (req, res, next) => {
    const { username, password } = req.body;

    const userDoc = await userService.getUser(username);

    // if a user exists with provided username then return 400 response
    if (userDoc !== null) return res.status(400).json({ message: "username already taken. choose another name" });


    await userService.createUser({ username, password });

    const accessToken = await createAccessToken({ username });
    const refreshToken = await createRefreshToken({ username });

    signAccessTokenCookie(res, accessToken);
    signRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({ message: "success" });
}