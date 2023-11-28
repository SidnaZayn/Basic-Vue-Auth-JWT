import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        token: null,
        tokenExpDate: null,
        countdownVal: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }),
    actions: {
        initialize() {
            // Retrieve the token from localStorage on page load
            this.user = JSON.parse(localStorage.getItem('userInfo'));
            this.token = localStorage.getItem('Authorization');
        },
        logout() {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('title');
            this.user = null;
            this.token = null;
            window.location.reload();
        },
        getTokenExpDate() {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.token.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));

            // set expired date
            this.tokenExpDate = new Date(jwtToken.exp * 1000);
            console.log(this.tokenExpDate)
        },
        getCountdown() {
            const startDate = new Date(); // Current date and time
            const endDate = this.tokenExpDate // End date and time

            const timeDifference = endDate.getTime() - startDate.getTime();

            this.countdownVal.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            this.countdownVal.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.countdownVal.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            this.countdownVal.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        }
    }
});
