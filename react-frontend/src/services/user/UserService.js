import axios from "axios";
import AuthHeader from "../auth/AuthHeader";

const USER_API = "http://localhost:8081/api/v1/users"

class UserService {

    updateUser(user, id) {
        return axios.put(USER_API + "/" + id, user, {
            headers: AuthHeader()
        });
    }

    getUserById(id) {
        return axios.get(USER_API + "/full/" + id, {
            headers: AuthHeader()
        })
    }
    getPost(userId, bookId) {
        return axios.get(USER_API + "/" + userId + "/post/" + bookId, {
            headers: AuthHeader()
        });
    }

    createPost(userId, bookId, post) {
        return axios.post(USER_API + "/" + userId + "/post/" + bookId, post, {
            headers: AuthHeader()
        });
    }
    updatePost(postId, post) {
        return axios.put(USER_API + "/post/" + postId, post, {
            headers: AuthHeader()
        });
    }
    deletePost(postId) {
        return axios.delete(USER_API + "/post/" + postId, {
            headers: AuthHeader()
        });
    }
}

export default new UserService();