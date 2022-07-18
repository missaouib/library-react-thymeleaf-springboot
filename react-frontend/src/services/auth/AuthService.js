import axios from "axios"
const API_URL = "http://localhost:8081/api/v1/auth"

class AuthService {
    async login(userinfo) {
        const res = await axios.post(API_URL + "/signin", userinfo);
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(userinfo) {
        return axios.post(API_URL + "/signup", userinfo)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();

