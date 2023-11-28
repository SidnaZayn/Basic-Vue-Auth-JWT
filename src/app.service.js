import axios from "./helper/axios-default";

export default class AppService {
    login({ username, password }) {
        return axios
            .post("/auth/login", {
                username,
                password
            })
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            }).catch((error) => {
                console.log(error)
                return Promise.reject(error);
            });
    }
    
    getTesting() {
        return axios.get('/auth/testing').then((response) => {
            if (response) {
                return response;
            }
        }).catch((error) => {
            console.log(error)
            return Promise.reject(error);
        });
    }
}

