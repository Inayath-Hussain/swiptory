import { genSalt, hash } from "bcrypt";
import { createRequest, createResponse } from "node-mocks-http";

import { loginController } from "./login";
import { User } from "../../models/user";
import { userService } from "../../services/user";
import { verifyAccessToken } from "../../utilities/tokens/accessToken";
import { verifyRefreshToken } from "../../utilities/tokens/refreshToken";


const mockedGetUser = jest.spyOn(userService, "getUser");

describe("login controller", () => {
    test("should return 400 response when record or document with provided username doesn't exist", async () => {
        const req = createRequest({ body: { username: "test1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username isn't registered" }

        mockedGetUser.mockResolvedValue(null);

        await loginController(req, res, next);

        expect(res._getStatusCode()).toBe(400);
        expect(res._getJSONData()).toEqual(errorObj);
    })



    test("should return 400 response when username and password donot match", async () => {
        const req = createRequest({ body: { username: "test1", password: "Example@1" } });
        const res = createResponse();
        const next = jest.fn();

        const user = { username: "test1", password: "Example@2" }

        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password, salt);

        const userDoc = new User({ username: user.username, password: hashedPassword });

        const errorObj = { message: "username and password donot match" };

        mockedGetUser.mockResolvedValue(userDoc);

        await loginController(req, res, next);

        expect(res._getStatusCode()).toBe(400);
        expect(res._getJSONData()).toEqual(errorObj);
    })



    test("should return 200 response when username and password match", async () => {
        const user = { username: "test1", password: "Example@1" }
        const req = createRequest({ body: user });
        const res = createResponse();
        const next = jest.fn();

        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password, salt);

        const userDoc = new User({ username: user.username, password: hashedPassword });


        mockedGetUser.mockResolvedValue(userDoc);

        await loginController(req, res, next);

        expect(res._getStatusCode()).toBe(200);

        const { accessToken, refreshToken } = res.cookies

        const accessTokenPayload = await verifyAccessToken(accessToken.value)
        const refreshTokenPayload = await verifyRefreshToken(refreshToken.value)


        expect(accessTokenPayload.valid).toBe(true)
        if (accessTokenPayload.valid === true) expect(accessTokenPayload.payload.username).toBe(user.username)

        expect(refreshTokenPayload.valid).toBe(true)
        if (refreshTokenPayload.valid === true) expect(refreshTokenPayload.payload.username).toBe(user.username)
    })

})