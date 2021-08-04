import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Document from '../pages/Document';
import Procedure from '../pages/Procedure';
import User from '../pages/User';
import Profile from '../pages/Profile';
import NotFoundPage from '../pages/NotFoundPage';

const Router = [
    {
        path: '/login',
        exact: true,
        noLayout: true,
        main: () => <Login />
    },
    {
        path: '/register',
        exact: true,
        noLayout: true,
        main: () => <Register />
    },
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/document',
        main: () => <Document />
    },
    {
        path: '/procedure',
        main: () => <Procedure />
    },
    {
        path: '/user',
        main: () => <User />
    },
    {
        path: '/profile',
        main: () => <Profile />
    },
    {
        path: '*',
        main: () => <NotFoundPage />
    },
];

export default Router;
