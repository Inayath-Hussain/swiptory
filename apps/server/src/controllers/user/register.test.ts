import { createRequest, createResponse } from "node-mocks-http";

import { User } from "../../models/user";
import { registerController } from "./register";
import { userService } from "../../services/user";
import { verifyAccessToken } from "../../utilities/tokens/accessToken";
import { verifyRefreshToken } from "../../utilities/tokens/refreshToken";
import { userStoriesService } from "../../services/userStories";
import { UserStories } from "../../models/userStories";
import mongoose from "mongoose";


const mockedGetUser = jest.spyOn(userService, "getUser");
const mockedCreateUser = jest.spyOn(userService, "createUser");
const mockedAddNewUserStories = jest.spyOn(userStoriesService, "addNewUser");

const mockedStartSession = jest.spyOn(mongoose, "startSession")
    // @ts-ignore
    .mockResolvedValue({
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn()
    });


describe("register controller", () => {
    test("should return 400 response when record with given username already exists.", async () => {
        const req = createRequest({ body: { username: "test1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username already taken. choose another name" }

        const userDoc = new User({ username: "test1", password: "weoifnwoe" })

        mockedGetUser.mockResolvedValue(userDoc)

        await registerController(req, res, next)

        expect(res._getStatusCode()).toBe(400)
        expect(res._getJSONData()).toEqual(errorObj)
    })



    test("should return 201 response along with valid auth cookies when record with given username doesn't exist", async () => {
        const user = { password: "Example@1", username: "test1" };
        const req = createRequest({ body: user });
        const res = createResponse();
        const next = jest.fn();


        mockedGetUser.mockResolvedValue(null)

        const userDoc = new User(user);
        mockedCreateUser.mockResolvedValue(userDoc)
        mockedAddNewUserStories.mockResolvedValue(new UserStories({ user: userDoc._id, stories: [] }))

        await registerController(req, res, next)

        expect(res._getStatusCode()).toBe(201)

        const { accessToken, refreshToken } = res.cookies

        const accessTokenPayload = await verifyAccessToken(accessToken.value)
        const refreshTokenPayload = await verifyRefreshToken(refreshToken.value)


        expect(accessTokenPayload.valid).toBe(true)
        if (accessTokenPayload.valid === true) expect(accessTokenPayload.payload.username).toBe(user.username)

        expect(refreshTokenPayload.valid).toBe(true)
        if (refreshTokenPayload.valid === true) expect(refreshTokenPayload.payload.username).toBe(user.username)

        expect(mongoose.startSession).toHaveBeenCalledTimes(1)
    })
})