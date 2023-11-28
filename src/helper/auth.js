import axiosInterceptor from "./axios-default.js";

function setLogin(response) {
    localStorage.setItem('isLoggedIn', JSON.stringify("true"));
    localStorage.setItem('title', 'Percobaan');
    localStorage.setItem('Authorization', response.token);
    localStorage.setItem(
        'userInfo',
        JSON.stringify({
            username: response['user']['username'],
            displayName: response['user']['displayName'],
            fullName: response['user']['fullName'],
            id: response['user']['id'],
        })
    );
}

export { setLogin }