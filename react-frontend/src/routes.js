import Dashboard from './views/Dashboard.js';
import UserHome from './components/user/UserHome';
import BookHome from './components/books/BookHome';
import AuthorHome from './components/authors/AuthorHome';
const dashboardRoutes = [
    {
        path:"/dashboard",
        icon:"nc-icon nc-chart-pie-35",
        element: Dashboard
    },
    {
        path:"/all/users",
        icon:"nc-icon nc-chart-pie-35",
        element: UserHome
    },
    {
        path:"/all/books",
        icon:"nc-icon nc-chart-pie-35",
        element: BookHome
    },
    {
        path:"/all/authors",
        icon:"nc-icon nc-chart-pie-35",
        element: AuthorHome
    },

]

export default dashboardRoutes;