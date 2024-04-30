import { createRequest, createResponse } from "node-mocks-http"
import { validateLikeOrUnlikeStoryBody } from "./validateLikeOrUnlikeStoryBody";

describe("validateLikeStoryBody middleware", () => {

    test("should return 422 response when story_id is missing", (done) => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();

        validateLikeOrUnlikeStoryBody(req, res, next);


        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id is required" })

        done();
    })


    test("should return 422 response when story_id is object", (done) => {
        const req = createRequest({ body: { story_id: {} } });
        const res = createResponse();
        const next = jest.fn();

        validateLikeOrUnlikeStoryBody(req, res, next);


        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id should be either string or number" })

        done();
    })


    test("should return 422 response when story_id is array", (done) => {
        const req = createRequest({ body: { story_id: {} } });
        const res = createResponse();
        const next = jest.fn();

        validateLikeOrUnlikeStoryBody(req, res, next);


        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id should be either string or number" })

        done();
    })

})