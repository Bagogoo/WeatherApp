import Vue from 'vue';
import { users } from '../../services/userDataService';
export default Vue.extend({
    name: 'Confirm',
    props: {
        email: {
            type: String as () => string | undefined
        }
    },
    mounted() {
        this.confirm(this.email);
    },
    methods: {
        async confirm(email: string | undefined) {
            if (email === undefined) {
                alert('Coś poszło nie tak');
            }
            else return await users.confirm(email);
            this.$router.push({ name: 'login' });
        }
    }
});