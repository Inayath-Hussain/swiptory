import { hash, genSalt } from "bcrypt";
import { User } from "../models/user";
import { ClientSession } from "mongoose";

interface CreateUserParam {
    username: string
    password: string
}

class UserService {
    async getUser(username: string) {
        return await User.findOne({ username });
    }


    async createUser({ password, username }: CreateUserParam, session: ClientSession | null = null) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const userDoc = new User({ username, password: hashedPassword });

        // assosiate with a session if provided
        userDoc.$session(session)
        return userDoc.save();
    }
}


/**
 * provides methods to execute db operations on users table or collection
 */
export const userService = new UserService();