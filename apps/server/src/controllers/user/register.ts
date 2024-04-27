import { RequestHandler } from "express";
import { startSession } from "mongoose";

import { Ierror } from "../errorHandler";
import { IAuthRequestBody } from "../../middlewares/user/validateAuthRequestBody";
import { userService } from "../../services/user";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { userStoriesService } from "../../services/userStories";


export const registerController: RequestHandler<{}, {}, IAuthRequestBody> = async (req, res, next) => {
    const { username, password } = req.body;

    const existingUserDoc = await userService.getUser(username);

    // if a user exists with provided username then return 400 response
    if (existingUserDoc !== null) return res.status(400).json({ message: "username already taken. choose another name" });


    const session = await startSession();

    // start transaction
    session.startTransaction();

    try {
        const userDoc = await userService.createUser({ username, password }, session);

        await userStoriesService.addNewUser(userDoc._id.toString(), session);

        // commit if both tasks are successful
        await session.commitTransaction();

        const accessToken = await createAccessToken({ username });
        const refreshToken = await createRefreshToken({ username });

        signAccessTokenCookie(res, accessToken);
        signRefreshTokenCookie(res, refreshToken);

        res.status(201).json({ message: "success" });
    }
    catch (ex) {
        console.log(ex)
        // abort if any error occurred
        await session.abortTransaction();

        next({ message: "Internal server error", statusCode: 500 } as Ierror)
    }
    finally {
        // end session
        await session.endSession();
    }
}