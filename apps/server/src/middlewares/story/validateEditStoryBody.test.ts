import { createRequest, createResponse } from "node-mocks-http";

import { validateEditStoryBody } from "./validateEditStoryBody";
import { categoryService } from "../../services/category";


const mockedGetCategoryNames = jest.spyOn(categoryService, "getCategoryNames");
mockedGetCategoryNames.mockResolvedValue({ categories: [] })

describe("validateAddStoryBody middleware", () => {
    test("should return 422 response when request body is not of type object", (done) => {
        const req = createRequest({ body: ['  ef '] });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "request body should be an object" });

        done();
    })


    test("should return 422 response when slides property is missing", (done) => {
        const req = createRequest({ body: {} });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "slides field is required" });

        done();
    })


    test("should return 422 response when category is missing", (done) => {
        const req = createRequest({ body: { slides: "h" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "category field is required" });

        done();
    })


    test("should return 422 response when story_id is missing", (done) => {
        const req = createRequest({ body: { slides: "h", category: "foog" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id field is required" });

        done();
    })


    test("should return 422 response when extra field exists", (done) => {
        const req = createRequest({ body: { slides: "s", category: "c", story_id: "12", test: "" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "body should contain story_id, slides and category only" });

        done();
    })


    test("should return 422 response when slides fiels is not an array", (done) => {
        const req = createRequest({ body: { slides: "s", category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "slides field should be array" });

        done()
    })


    test("should return 422 response when slides length is less than 3", (done) => {
        const req = createRequest({ body: { slides: ["s"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Minimum 3 slides are required" });

        done()
    })


    test("should return 422 response when slides length is more than 6", (done) => {
        const req = createRequest({ body: { slides: ["1", "2", "3", "4", "5", "6", "7"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Maximum of 6 slides are allowed" });

        done()
    })


    test("should return 422 response when slides array doesnot contain object", (done) => {
        const req = createRequest({ body: { slides: ["1", "2", "3"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "slides should only contain array of objects" });

        done()
    })


    test("should return 422 response when slides array doesnot contain heading property", async () => {
        const req = createRequest({ body: { slides: [{ test: "   hello  " }, "sf", "sef"], category: "as", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });
    })


    test("should return 422 response when heading is empty string", async () => {
        const req = createRequest({ body: { slides: [{ heading: "    " }, "sef", "sfgreg"], category: "as", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });

    });


    test("should return 422 response when heading is an integer", async () => {
        const req = createRequest({ body: { slides: [{ heading: 526 }, "sef", "sfgreg"], category: "as", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading should contain atleast 1 letter" });
    });


    test("should return 422 response when heading is an object", async () => {
        const req = createRequest({ body: { slides: [{ heading: { test: "hello" } }, "wrer", "ewrter"], category: "435", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading should contain atleast 1 letter" });
    });


    test("should return 422 response when heading is null", async () => {
        const req = createRequest({ body: { slides: [{ heading: null }, "efu", "sgnr"], category: 'c', story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "heading is required" });
    });


    test("should return 422 response when description is empty string", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: "" }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description is required" });
    });


    test("should return 422 response when description is integer", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: 123 }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description should contain atleast 1 letter" });
    })


    test("should return 422 response when description is object", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: { test: "hello" } }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "description should contain atleast 1 letter" });
    })


    test("should return 422 response when image is empty string", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: "test description", image: "" }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image is required" });
    })


    test("should return 422 response when image is integer", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: "test description", image: 456 }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image should contain a valid url" });
    })


    test("should return 422 response when image is object", async () => {
        const req = createRequest({ body: { slides: [{ heading: "test", description: "test description", image: { url: "esofnsono" } }, "efu", "sgnr"], category: "c", story_id: "12" } });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "image should contain a valid url" });
    })


    test("should return 422 response when category is empty string", async () => {
        const req = createRequest({
            body: {
                slides: [
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                ],
                category: "",
                story_id: "12"
            }
        });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "category field is required" });
    })


    test("should return 422 response when category is number", async () => {
        const req = createRequest({
            body: {
                slides: [
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                ],
                category: 123,
                story_id: "12"
            }
        });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "category should contain atleast 1 letter" });
    })


    test("should return 422 response when category value doesn't exist in db", async () => {
        const req = createRequest({
            body: {
                slides: [
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                ],
                category: "food",
                story_id: "12"
            }
        });
        const res = createResponse();
        const next = jest.fn();

        mockedGetCategoryNames.mockResolvedValue({ categories: ["movies"] })
        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "Invalid category value. Category doesn't exist" });
    })


    test("should return 422 response when story_id is empty string", async () => {
        const req = createRequest({
            body: {
                slides: [
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                ],
                category: "g",
                story_id: ""
            }
        });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id field is required" });
    })


    test("should return 422 response when story_id is an object", async () => {
        const req = createRequest({
            body: {
                slides: [
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                    { heading: "test", description: "test description", image: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/category%2Fhealth%20and%20fitness.jpg?alt=media&token=bb2b48d0-544a-4120-86c7-6f0e89f6f74a" },
                ],
                category: "123",
                story_id: { test: "hello" }
            }
        });
        const res = createResponse();
        const next = jest.fn();

        await validateEditStoryBody(req, res, next);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getJSONData()).toEqual({ message: "story_id should be either string or number" });
    })
})