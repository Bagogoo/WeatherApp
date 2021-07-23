import Vue from 'vue';
import { users } from '../../services/userDataService'
interface Data {
    data: {
        email: string,
        password: string,
        confirmation: string,
        submitted: boolean,
        error: string | null,
    }
}
export default Vue.extend({
    name: 'Register',
    data(): Data {
        return {
            data: {
                email: '',
                password: '',
                confirmation:'',
                submitted: false,
                error: null
            }
        }
    },
    methods: {
        async register(email: string, password: string, confirmation: string) {
            try {
                await users.register(email, password, confirmation).then((response) => {
                    alert('Pomyślnie zarejestrowano');
                    return response;
                });

            }
            catch (error) {
                this.data.error = error;
            }
           
        }
    }
});
