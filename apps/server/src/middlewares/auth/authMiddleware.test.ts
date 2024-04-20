import { createRequest, createResponse } from "node-mocks-http"

import { authMiddleware } from "./authMiddleware";
import { User } from "../../models/user";
import { userService } from "../../services/user";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";

import * as JWTAccessToken from "../../utilities/tokens/accessToken";
import * as JWTRefreshToken from "../../utilities/tokens/refreshToken";

const mockedGetUser = jest.spyOn(userService, "getUser");

const mockedVerifyAccessToken = jest.spyOn(JWTAccessToken, "verifyAccessToken");
const mockedVerifyRefreshToken = jest.spyOn(JWTRefreshToken, "verifyRefreshToken");


const getDayOlderUTC = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return Date.parse(date.toString()) / 1000
}


describe("checkRequestAuthentication middleware", () => {
    test("should call next with 401 response when request does not contain access and refresh token", (done) => {
        const req = createRequest({ signedCookies: {} });
        const res = createResponse();
        const next = jest.fn();

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Authentication tokens required" })

        done();
    })


    test("should call next with 401 response when only invalid access token is present", async () => {
        const req = createRequest({ signedCookies: { accessToken: "eobe wovewjngfowegn" } });
        const res = createResponse();
        const next = jest.fn();

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when only invalid refresh token is present", async () => {
        const req = createRequest({ signedCookies: { refreshToken: "eobe wovewjngfowegn" } });
        const res = createResponse();
        const next = jest.fn();

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when both access and refresh token are invalid", async () => {
        const req = createRequest({ signedCookies: { refreshToken: "eobewovewjngfowegn", accessToken: "ifnrojgbrugvnw" } });
        const res = createResponse();
        const next = jest.fn();

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when user doesn't exist in db", async () => {

        const username = "test1";
        const accessToken = await createAccessToken({ username });
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { refreshToken, accessToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when access token is valid but user doesn't exist in db", async () => {
        const username = "test1";
        const accessToken = await createAccessToken({ username });

        const req = createRequest({ signedCookies: { accessToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })



    test("should call next with 401 response when refresh token is valid but user doesn't exist in db", async () => {
        const username = "test1";
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { refreshToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when access token is valid but refresh token is invalid", async () => {
        const username = "test1";
        const accessToken = await createAccessToken({ username });

        const req = createRequest({ signedCookies: { accessToken, refreshToken: "aeofne orenigergoerovgnre" } });
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with 401 response when access token is invalid but refresh token is valid", async () => {
        const username = "test1";
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { accessToken: "sefewfaoefnewuvrnb0oerng0rv", refreshToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({ statusCode: 401, message: "Invalid authentication tokens" })
    })


    test("should call next with no args when only valid access token is present", async () => {
        const username = "test1";
        const accessToken = await createAccessToken({ username });

        const req = createRequest({ signedCookies: { accessToken } });
        const res = createResponse();
        const next = jest.fn();

        const userDoc = new User({ username, password: "aef", profilePic: "eifon" })
        mockedGetUser.mockResolvedValue(userDoc);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith();
    })


    test("should call next with no args when only valid refresh token is present", async () => {
        const username = "test1";
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { refreshToken } });
        const res = createResponse();
        const next = jest.fn();

        const userDoc = new User({ username, password: "aef", profilePic: "eifon" })
        mockedGetUser.mockResolvedValue(userDoc);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith();
    })


    test("should call next with no args when expired access token and valid refresh token are present", async () => {
        const username = "test1";

        const accessToken = await createAccessToken({ username });
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { accessToken, refreshToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedVerifyAccessToken.mockResolvedValue({ accessToken, valid: false, errorType: "expired" })
        const userDoc = new User({ username, password: "aef", profilePic: "eifon" })
        mockedGetUser.mockResolvedValue(userDoc);
        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith();
    })


    test("should create new refresh token when it is issued more than a day ago", async () => {
        const username = "test1";

        const accessToken = await createAccessToken({ username });
        const refreshToken = await createRefreshToken({ username });

        const req = createRequest({ signedCookies: { accessToken, refreshToken } });
        const res = createResponse();
        const next = jest.fn();

        mockedVerifyAccessToken.mockRestore()

        const userDoc = new User({ username, password: "aef", profilePic: "eifon" })
        mockedGetUser.mockResolvedValue(userDoc);

        mockedVerifyRefreshToken.mockResolvedValueOnce({ refreshToken, valid: true, payload: { username, iat: getDayOlderUTC() } })

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith();


        mockedVerifyRefreshToken.mockRestore();
        const { refreshToken: resRefreshToken } = res.cookies

        console.log(resRefreshToken)
        const refreshTokenPayload = await JWTRefreshToken.verifyRefreshToken(resRefreshToken.value)

        expect(refreshTokenPayload.valid).toBe(true)
        if (refreshTokenPayload.valid === true) expect(refreshTokenPayload.payload.username).toBe(username)


    })
})