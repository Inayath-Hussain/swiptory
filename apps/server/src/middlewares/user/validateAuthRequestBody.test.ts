import { createRequest, createResponse } from "node-mocks-http";
import { validateAuthRequestBody } from "./validateAuthRequestBody";


describe("validateAuthRequestBody middleware", () => {
    test("should return 422 response when request body doesnot contain any fields", (done) => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username is required" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done()
    })


    test("should return 422 response when username is missing in request body", (done) => {
        const req = createRequest({ body: { password: "Example@12" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username is required" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when username contains only white spaces", (done) => {
        const req = createRequest({ body: { username: "  ", password: "Example@12" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username is required" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when username contains only numbers", (done) => {
        const req = createRequest({ body: { username: 654, password: "Example@12" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username should contain letters" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when username is not of type string", (done) => {
        const req = createRequest({ body: { username: ["aofnj"], password: "Example@12" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "username should be of type string" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password is missing", (done) => {
        const req = createRequest({ body: { username: "uibfewibf" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password is required" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password contains only whitespace", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: "  " } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password is required" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password contains only numbers", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: 456 } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password should contain letters" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password is not of type string", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: ["aofue"] } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password should be of type string" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password is shorter than 8 letters", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: "aofue" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password must be 8 letters long" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password doesnot contain numbers", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: "Examplee" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password must contain atleast 1 number, 1 upper case letter and 1 special symbol" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should return 422 response when password doesnot contain special symbols", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: "Example1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "password must contain atleast 1 number, 1 upper case letter and 1 special symbol" }

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual(errorObj);

        done();
    })


    test("should call next when 422 response when both username and password are valid", (done) => {
        const req = createRequest({ body: { username: "uibfewibf", password: "Example@1" } });
        const res = createResponse();
        const next = jest.fn();

        validateAuthRequestBody(req, res, next);

        expect(res._getStatusCode()).toBe(200);
        expect(next).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(1);

        done();
    })

})