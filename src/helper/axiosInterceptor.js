import axiosInstance from "./axios-default.js"

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (store.token) {
                config.headers["Authorization"] = 'Bearer ' + store.token;  // for Spring Boot back-end
            }
            return config
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                // Handle token expiration here
                // For example, redirect to login page or refresh token
                store.logout();
                window.location.reload();
                return Promise.reject(error);
              }
            return Promise.reject(error);
        }
    )
}

export default setup;