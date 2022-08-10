import VueRouter from 'vue-router';
import HomeComponent from './pages/HomeComponent'
import AboutComponent from './pages/AboutComponent'
import TaskListComponent from './pages/TaskListComponent'
import Error404Component from './pages/Error404Component'

export default new VueRouter({
    routes: [
        {
            path: '',
            component: HomeComponent,
        },
        {
            path: '/about',
            component: AboutComponent,
        },
        {
            path: '/tasklist:user',
            component: TaskListComponent,
        },
        {
            path: '*',
            component: Error404Component,
        },
    ]
})