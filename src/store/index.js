import App from "../App";
import server from "../server"

let data = {
    allUsers: [],
    isSignUpPage: true,
    loggedInUser: "",
    selectedUser: "",
    comments: [],
    selectedComment: ""
}

let methods = {
    async signUpUser(userInfo) {
        try {
            return await server.post("users", userInfo);
        } catch (err) {
            console.error(err.message);
        }
    },
    async signInUser(userInfo) {
        try {
            return await server.get(`users/${userInfo?.id}`)
                .then(d => data.loggedInUser = d)
                .then(d => document.cookie = `userId=${d?.id}; max-age=2592000; path=/`)
                .then(() => App.rerender("#app"));
        } catch (err) {
            console.error(err.message);
        }
    },
    async getAllUsers() {
        try {
            return await server.get(`users`)
                .then(d => data.allUsers = d)
        } catch (err) {
            console.error(err.message)
        }
    },
    async getSignedInUser() {
        const userId = `${document.cookie}`.split("; userId=")[1];
        if (userId) {
            try {
                return await server.get(`users/${userId}`)
                    .then(d => data.loggedInUser = d)
            } catch (err) {
                console.error(err.message)
            }
        } else {
            data.loggedInUser = "";
        }
    },
    async getSelectedUser(userInfo) {
        try {
            return await server.get(`users`, userInfo);
        } catch (err) {
            console.error(err.message)
        }
    },
    signOut() {
        document.cookie = "userId=; max-age=0; path=/";
        data.loggedInUser = "";
        App.rerender("#app");
    },
    async getComments() {
        try {
            await server.get("comments")
            .then(d => data.comments = d)
        } catch (err) {
            console.error(err.message);
        }
    },
    async addComment(newComment) {
        try {
            return await server.post("comments", newComment);
        } catch (err) {
            console.error(err.message);
        }
    }
}

export default { data, methods };