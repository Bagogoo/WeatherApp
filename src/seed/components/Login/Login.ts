import Vue from 'vue';
import { LoginResponse, User, users } from '../../services/userDataService'
interface Data {
    data: {
        email: string,
        password: string,
        error: string | null,
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
                error: null,
                submitted: false
            }
        }
    },
    methods: {
        async login(email: string, password: string) {
            try {
                await users.login(email, password).then((response) => {
                    localStorage.setItem('ukey', response.login.ukey);
                    this.$router.push({ name: 'forecast' });
                    location.reload();

                    return response;
                });

            }
            catch (error) {
                this.data.error = error;
            }

        }
    }
});
