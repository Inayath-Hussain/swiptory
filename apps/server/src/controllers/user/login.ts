import { compare } from "bcrypt";
import { RequestHandler } from "express";

import { IAuthRequestBody } from "../../middlewares/user/validateAuthRequestBody";
import { userService } from "../../services/user";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";


const controller: RequestHandler<{}, {}, IAuthRequestBody> = async (req, res, next) => {
    const { password, username } = req.body;

    const userDoc = await userService.getUser(username);

    if (userDoc === null) return res.status(400).json({ message: "username isn't registered" });

    const isPasswordValid = await compare(password, userDoc.password)

    if (isPasswordValid === false) return res.status(400).json({ message: "username and password donot match" });

    const accessToken = await createAccessToken({ username });
    const refreshToken = await createRefreshToken({ username });

    signAccessTokenCookie(res, accessToken);
    signRefreshTokenCookie(res, refreshToken);


    return res.status(200).json({ message: "success" })
}



export const loginController = tryCatchWrapper(controller);