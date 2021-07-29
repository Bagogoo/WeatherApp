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
            await users.validate(localStorage.getItem('ukey')).then(response => {
                this.data.isValid = response;
                return response;
            });
             
        },
        logout() {
            localStorage.removeItem('ukey');
            location.reload();
        }
    }
});
