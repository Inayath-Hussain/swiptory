export const apiURLs = {
    login: "/api/user/login",
    register: "/api/user/register",
    profile: "/api/user/info",

    getCategory: "/api/category",

    getAllStories: "/api/story",
    getStoryById: (id: string) => `/api/story/${id}`,

    getAllStoriesOfCategory: (category: string) => `/api/story?category=${category}`,

    postStory: "/api/story",

    getUserStories: "/api/user/stories",

    editPostStory: "/api/story",

    getUserLikedStories: "/api/user/likedStories",


    likeStory: "/api/story/like",
    unlikeStory: "/api/story/unlike",

    getBookmarks: "/api/user/bookmarks",
    addBookmark: "/api/story/addBookmark",
    removeBookmark: "/api/story/removeBookmark",

    getBookmarkStories: "/api/user/bookmarkStories"

}