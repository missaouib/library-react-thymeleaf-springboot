import axios from 'axios';

const CATEGORY_API = "http://localhost:8081/api/v1/categories";

class CategoryService {

    getCategories() {
        return axios.get(CATEGORY_API + "/all");
    }
    getCategoryById(id) {
        return axios.get(CATEGORY_API + "/" + id);
    }

}

export default new CategoryService();