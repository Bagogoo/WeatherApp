import Vue from 'vue';
import { LoginResponse, User, users } from '../../services/userDataService'
interface Data {
    data: {
        email: string,
        password: string,
        submitted: boolean,
        error: string | null,
        returnedUser: LoginResponse[] 
    }
}
export default Vue.extend({
    name: 'Login',
    data(): Data {
        return {
            data: {
                email: '',
                password: '',
                submitted: false,
                error: null,
                returnedUser: []
            }
        }
    },
    methods: {
        async login(email: string, password: string) {
            try {
                await users.login(email, password).then((response) => {
                    this.data.returnedUser?.push(response);
                    console.log(this.data.returnedUser);
                    return response;
                });

            }
            catch (error) {
                this.data.error = error;
            }
           
        }
    }
});
