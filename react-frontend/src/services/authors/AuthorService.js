import axios from 'axios';

const AUTHOR_API = "http://localhost:8081/api/v1/authors";

class AuthorService {

    getAuthors() {
        return axios.get(AUTHOR_API + "/all");
    }
    getAuthorById(id) {
        return axios.get(AUTHOR_API + "/" + id);
    }

}

export default new AuthorService();