import axios from 'axios';

const BOOK_API = "http://localhost:8081/api/v1/books";
const POST_API = "http://localhost:8081/api/v1/posts";

class BookService {

    getBooks() {
        return axios.get(BOOK_API + "/all");
    }
    getBookById(id) {
        return axios.get(BOOK_API + "/" + id);
    }
    searchBooks(inputString) {
        return axios.get(BOOK_API + "/search?inputString=" + inputString)
    }
    getPosts(bookId, page, size) {
        return axios.get(POST_API + "/" + bookId + "?page=" + page+"&size=" + size);
    }
    

}

export default new BookService();