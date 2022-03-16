import Vue from 'vue';
import { users } from '../../services/userDataService';
export default Vue.extend({
    name: 'Confirm',
    props: {
        ukey: {
            type: String as () => string | undefined
        }
    },
    mounted() {
        this.confirm(this.ukey);
    },
    methods: {
        async confirm(ukey: string | undefined) {
            try {
                if (ukey === undefined) {
                    alert('Coś poszło nie tak');
                }
                else return await users.confirm(ukey);
            } catch (err) {
               alert(err);
            }
        }
           
        
    }
});