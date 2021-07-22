import Vue from 'vue';
import Router from 'vue-router';

import App from './components/App/App.vue';

import './assets/style.css';

Vue.use(Router);

new Vue({
    el: '#app',
    router: new Router({
        routes: [
            {
                path: '/',
                name: 'Forecast',
                component: () => import('./components/Forecast')
            },
            {
                path: '/login',
                name: 'Login',                
                component: () => import('./components/Login')
            }
            
        ]
    }),
    render: h => h(App),
});
