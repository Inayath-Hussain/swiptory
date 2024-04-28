import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const user_id = req.user_id as string;

    const userDoc = await userService.getUserById(user_id);

    res.status(200).json({ username: userDoc?.username, profilePicUrl: userDoc?.profilePic });
}




export const getUserInfoController = tryCatchWrapper(controller);