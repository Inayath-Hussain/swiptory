import { createRequest, createResponse } from "node-mocks-http";

import { validateAddStoryBody } from "./validateAddStoryBody";
import { categoryService } from "../../services/category";


const mockedGetCategoryNames = jest.spyOn(categoryService, "getCategoryNames");
mockedGetCategoryNames.mockResolvedValue({ categories: [] })

describe("validateAddStoryBody middleware", () => {
    test("should return 422 response when request body is not of type array", (done) => {
        const req = createRequest({ body: { heading: '  ef ' } });
        const res = createResponse();
        const next = jest.fn();

        validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "request body should be array" });

        done();
    })


    test("should return 422 response when request body doesnot contain array of objects", async () => {
        const req = createRequest({ body: ['  test ', "ef", "eferg"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "request body should only contain array of objects" });
    })


    test("should return 422 response when request body array doesnot contain heading property", async () => {
        const req = createRequest({ body: [{ test: "   hello  " }, "sfur", "sefrg"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });
    })


    test("should return 422 response when heading is empty string", async () => {
        const req = createRequest({ body: [{ heading: "  " }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });

    });


    test("should return 422 response when heading is an integer", async () => {
        const req = createRequest({ body: [{ heading: 456 }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading should contain atleast 1 letter" });
    });


    test("should return 422 response when heading is an object", async () => {
        const req = createRequest({ body: [{ heading: { test: "hello" } }, , "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading should contain atleast 1 letter" });
    });


    test("should return 422 response when heading is null", async () => {
        const req = createRequest({ body: [{ heading: null }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });
    });


    test("should return 422 response when description is empty string", async () => {
        const req = createRequest({ body: [{ heading: "test", description: "" }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description is required" });
    });


    test("should return 422 response when description is integer", async () => {
        const req = createRequest({ body: [{ heading: "test", description: 123 }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description should contain atleast 1 letter" });
    })


    test("should return 422 response when description is object", async () => {
        const req = createRequest({ body: [{ heading: "test", description: { test: "hello" } }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description should contain atleast 1 letter" });
    })


    test("should return 422 response when image is empty string", async () => {
        const req = createRequest({ body: [{ heading: "test", description: "test description", image: "" }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image is required" });
    })


    test("should return 422 response when image is integer", async () => {
        const req = createRequest({ body: [{ heading: "test", description: "test description", image: 456 }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image should contain a valid url" });
    })


    test("should return 422 response when image is object", async () => {
        const req = createRequest({ body: [{ heading: "test", description: "test description", image: { url: "esofnsono" } }, "efu", "sgnr"] });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image should contain a valid url" });
    })


    test("should return 422 response when category is empty string", async () => {
        const req = createRequest({
            body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: "" },
                "efu", "sgnr"
            ]
        });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "category is required" });
    })


    test("should return 422 response when category is number", async () => {
        const req = createRequest({
            body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: 123 }
                , "efu", "sgnr"
            ]
        });
        const res = createResponse();
        const next = jest.fn();

        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "category should contain atleast 1 letter" });
    })


    test("should return 422 response when category value doesn't exist in db", async () => {
        const req = createRequest({
            body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: "food" }
                , "efu", "sgnr"
            ]
        });
        const res = createResponse();
        const next = jest.fn();

        mockedGetCategoryNames.mockResolvedValue({ categories: ["movies"] })
        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Invalid category value. Category doesn't exist" });
    })



    test("should return 422 response when an element has an extra field", async () => {
        const req = createRequest({
            body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: "food", test: "hello" }
                , "efu", "sgnr"
            ]
        });
        const res = createResponse();
        const next = jest.fn();

        mockedGetCategoryNames.mockResolvedValue({ categories: ["food"] });
        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "elements should contain heading, description, image and category only." });
    })



    test("should return 422 response when array has less than 3 slides", async () => {
        const req = createRequest({ body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: "food" }] });
        const res = createResponse();
        const next = jest.fn();

        mockedGetCategoryNames.mockResolvedValue({ categories: ["food"] });
        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Minimum 3 slides are required" });
    })



    test("should return 422 response when array has more than 6 slides", async () => {
        const req = createRequest({
            body: [{ heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a", category: "food" }
                , "efu", "sgnr", "efu", "sgnr", "efu", "sgnr"
            ]
        });
        const res = createResponse();
        const next = jest.fn();

        mockedGetCategoryNames.mockResolvedValue({ categories: ["food"] });
        await validateAddStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Maximum of 6 slides are allowed" });
    })
})