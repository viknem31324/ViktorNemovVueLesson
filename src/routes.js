import VueRouter from 'vue-router';
import HomeComponent from './pages/HomeComponent';
import RegistrationComponent from './pages/RegistrationComponent';
import AboutComponent from './pages/AboutComponent';
import TaskListComponent from './pages/TaskListComponent';
import TaskComponent from './pages/TaskComponent';
import Error404Component from './pages/Error404Component';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: HomeComponent,
        },
        {
            path: '/registration',
            component: RegistrationComponent,
        },
        {
            path: '/about',
            component: AboutComponent,
        },
        {
            path: '/tasklist',
            component: TaskListComponent,
        },
        {
            path: '/task/:id',
            component: TaskComponent,
        },
        {
            path: '*',
            component: Error404Component,
        },
    ]
})