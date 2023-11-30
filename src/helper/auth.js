import axiosInterceptor from "./axios-default.js";

function setLogin(response) {
    localStorage.setItem('isLoggedIn', JSON.stringify("true"));
    localStorage.setItem('title', 'Percobaan');
    localStorage.setItem('Authorization', response.token);
    localStorage.setItem('isAdmin', response['isAdmin']);
    localStorage.setItem(
        'userInfo',
        JSON.stringify({
            username: response['user']['username'],
            displayName: response['user']['name'],
            id: response['user']['id'],
        })
    );
}

export { setLogin }