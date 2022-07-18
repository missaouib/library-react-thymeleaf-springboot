import axios from 'axios';

const PUBLISHER_API = "http://localhost:8081/api/v1/publishers";

class PublisherService {

    getPublishers() {
        return axios.get(PUBLISHER_API + "/all");
    }
    getPublisherById(id) {
        return axios.get(PUBLISHER_API + "/" + id);
    }

}

export default new PublisherService();