import Vue from 'vue';
import Forecast from '../Forecast';
export default Vue.extend({
    name: 'Compare',
    components: { Forecast },
    data: {
        children: [
            Forecast
        ]
    },
    methods: {
        add() {
            this.children.push(Forecast);
        }
    }
});