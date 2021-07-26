import Vue from 'vue';

export default Vue.extend({
    name: 'Nav',
    methods: {
        isloggedIn() {
            if (localStorage.getItem('access_token')) {
                return true;
            }
        },
        logout() {
            localStorage.removeItem('access_token');
            location.reload();
        }
    }
});
