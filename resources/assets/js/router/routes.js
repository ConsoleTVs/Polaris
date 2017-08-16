import store from '../store';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Links from '../pages/Links';
import Link from '../pages/Link';
import CreateLink from '../pages/CreateLink';

export default [
    {
        path: '/', name: 'index', component: Welcome,
        meta: {
            title: store.state.page.app,
            description: 'URL redirector made with VueJS',
            auth: null,
        }
    },
    {
        path: '/login', name: 'login', component: Login,
        meta: {
            title: 'Login',
            description: 'Access to your account',
            auth: false,
        }
    },
    {
        path: '/register', name: 'register', component: Register,
        meta: {
            title: 'Register',
            description: 'Register a new account',
            auth: false,
        }
    },
    {
        path: '/dashboard', name: 'dashboard', component: Dashboard,
        meta: {
            title: 'Dashboard',
            description: 'Application dashboard',
            auth: true,
        }
    },
    {
        path: '/links', name: 'links', component: Links,
        meta: {
            title: 'Links',
            description: 'All your created links',
            auth: true,
        }
    },
    {
        path: '/links/create', name: 'create_link', component: CreateLink,
        meta: {
            title: 'Create Link',
            description: 'Shorten a new link',
            auth: true,
        }
    },
    {
        path: '/links/:id', name: 'link', component: Link,
        meta: {
            title: 'Link Information',
            description: 'Information and views of the link',
            auth: true,
        }
    },
];
