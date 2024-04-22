export const apiURLs = {
    login: "/api/user/login",
    register: "/api/user/register",

    getCategory: "/api/category",

    getAllStories: "/api/story",

    getAllStoriesOfCategory: (category: string) => `/api/story?category=${category}`
}