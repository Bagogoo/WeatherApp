import Vue from 'vue';
import { users } from '../../services/userDataService';

interface Data {
    data: {
        isValid: Boolean;
    }
}
export default Vue.extend({
    name: 'Nav',
    data(): Data {
        return {
            data: {
                isValid: false
            }
        }
    },
    async mounted() {
        this.isloggedIn();
    },
    methods: {
        async isloggedIn() {
            if (localStorage.getItem('ukey')) {
                this.data.isValid = true;
            }
        },
        logout() {
            localStorage.removeItem('ukey');
            location.reload();
        }
    }
});
