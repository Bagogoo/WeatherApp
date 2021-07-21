import Vue from 'vue';
import { users } from '../../services/userDataService'
interface Data {
    data: {
        email: string,
        password: string,
        submitted: boolean
    }
}
export default Vue.extend({
    name: 'Login',
    data(): Data {
        return {
            data: {
                email: '',
                password: '',
                submitted: false
            }
        }
    },
    methods: {
        async login(email: string, password: string) {
            console.log(await users.login(email, password));
            console.log(localStorage.getItem('ukey'));
        }
    }
});
