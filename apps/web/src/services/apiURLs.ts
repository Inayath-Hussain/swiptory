export const apiURLs = {
    login: "/api/user/login",
    register: "/api/user/register",
    profile: "/api/user/info",

    getCategory: "/api/category",

    getAllStories: "/api/story",

    getAllStoriesOfCategory: (category: string) => `/api/story?category=${category}`,

    postStory: "/api/story"

}