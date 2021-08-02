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
                name: 'forecast',
                component: () => import('./components/Forecast')
            },
            {
                path: '/login',
                name: 'Login',                
                component: () => import('./components/Login')
            },
            {
                path: '/register',
                name: 'Register',                
                component: () => import('./components/Register')
            },
            {
                path: '/confirm/:email',
                name: 'Confirm',
                props: true,
                component: () => import('./components/Confirm')
            }
            
        ]
    }),
    render: h => h(App),
});
