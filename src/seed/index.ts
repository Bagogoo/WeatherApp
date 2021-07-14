import Vue from 'vue';
import Router from 'vue-router';

import App from './components/App/App.vue';
// import Hello from './components/Hello';
// import Elo from './components/Elo';

import './assets/style.css';

Vue.use(Router);

new Vue({
    el: '#app',
    router: new Router({
        routes: [
            {
                path: '/',
                name: 'Hello',
                component: () => import('./components/Hello')
            },
            {
                path: '/elo',
                name: 'Elo',                
                component: () => import('./components/Elo')
            },
            {
                path: '/elo/:age',
                name: 'Elo',
                props: true,
                component: () => import('./components/Elo')
            },
            {
                path: '/users',
                name: 'Users',
                component: () => import('./components/Users')
            },
            {
                path: '/users/:id',
                name: 'Users',
                props:true,
                component: () => import('./components/SingleUser')
            },
            {
                path: '/add-user',
                name: 'AddUser',
                component: () => import('./components/AddUser')
            }
        ]
    }),
    render: h => h(App),
});
