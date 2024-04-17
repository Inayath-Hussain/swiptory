import { hash, genSalt } from "bcrypt";
import { User } from "../models/user";

interface CreateUserParam {
    username: string
    password: string
}

class UserService {
    async getUser(username: string) {
        return await User.findOne({ username });
    }


    async createUser({ password, username }: CreateUserParam) {
        const defaultProfilePic = "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/profile%20picture.jfif?alt=media&token=fa110f88-e595-4db9-9eda-eaa1ded10a50"

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const userDoc = new User({ username, password: hashedPassword, profilePic: defaultProfilePic });
        return userDoc.save();
    }
}


/**
 * provides methods to execute db operations on users table or collection
 */
export const userService = new UserService();