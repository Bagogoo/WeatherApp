import { validate } from 'graphql';
import Vue from 'vue';
import { use } from 'vue/types/umd';
import { LoginResponse, User, users } from '../../services/userDataService'
interface Data {
    data: {
        email: string,
        password: string,
        error: string | null,
        submitted: boolean,
        isValidSession:boolean
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
                submitted: false,
                isValidSession:false
            }
        }
    },
    mounted() {
        this.validateUser();
    },
    methods: {
        async login(email: string, password: string) {
            try {
                if (!this.data.isValidSession) {
                    await users.login(email, password).then((response) => {
                        localStorage.setItem('ukey', response.login.ukey);
                    });
                }
                this.$router.push('./');
                location.reload();
                
            }
            catch (error) {
                this.data.error = error;
            }

        },
        async validateUser() {
            try {
                await users.validate(localStorage.getItem('ukey')).then(response => {
                    this.data.isValidSession = response;
                    return response;
                });
            }
            catch (err) {
                this.data.error = err;
            }
        }
    }
});
