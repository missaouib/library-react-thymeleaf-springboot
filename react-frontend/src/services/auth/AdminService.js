import axios from 'axios';
import AuthHeader from './AuthHeader';

const API_URL = 'http://localhost:8081/api/v1/admin';

class AdminService {
    
    getUsers() {
        return axios.get(API_URL + "/user", {
            headers: AuthHeader()
        });
    }
    updateUser(id, user) {
        return axios.put(API_URL + "/user/" + id, user, {
            headers: AuthHeader()
        })
    }
    
    deleteBook(id) {
        return axios.delete(API_URL + "/book/" + id, {
            headers: AuthHeader()
        });
    }
    updateBook(book, id) {
        return axios.put(API_URL + "/book/" + id, book, {
            headers: AuthHeader()
        });
    }
    createBook(book) {
        return axios.post(API_URL + "/book", book, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": AuthHeader().Authorization !== null ? AuthHeader().Authorization:""
            }
        });
    }

    deleteAuthor(id) {
        return axios.delete(API_URL + "/author/" + id, {
            headers: AuthHeader()
        });
    }
    updateAuthor(author, id) {
        return axios.put(API_URL + "/author/" + id, author, {
            headers: AuthHeader()
        });
    }
    createAuthor(author) {
        return axios.post(API_URL + "/author", author, {
            headers: AuthHeader()
        });
    }

    deleteCategory(id) {
        return axios.delete(API_URL + "/category/" + id, {
            headers: AuthHeader()
        });
    }
    updateCategory(category, id) {
        return axios.put(API_URL + "/category/" + id, category, {
            headers: AuthHeader()
        });
    }
    createCategory(category) {
        return axios.post(API_URL + "/category", category, {
            headers: AuthHeader()
        });
    }

    deletePublisher(id) {
        return axios.delete(API_URL + "/publisher/" + id, {
            headers: AuthHeader()
        });
    }
    updatePublisher(publisher, id) {
        return axios.put(API_URL + "/publisher/" + id, publisher, {
            headers: AuthHeader()
        });
    }
    createPublisher(publisher) {
        return axios.post(API_URL + "/publisher", publisher, {
            headers: AuthHeader()
        });
    }
}

export default new AdminService();