import Vue from 'vue';
import { users } from '../../services/userDataService';
import Forecast from '../Forecast';

interface Data {
    data: {
        location: string | null
    }
}

export default Vue.extend({
    name: 'Logged',
    components: {Forecast},
    data(): Data {
        return {
            data: {
                location: ''
            }
        }
    },
    methods: {
       async getLocation() {
            if (localStorage.getItem('access_token')) {
                const ukey = localStorage.getItem('access_token');
                if (ukey != null) {
                    await users.getProfile(ukey).then((response) => {
                        if (response != undefined) {
                            this.data.location = response.profile.cities;
                        }
                   });
                }
            }
        }
    },
    created() {
        this.getLocation();
    }

});
