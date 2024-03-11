import Admin from "./pages/Admin"
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    ORGANIZATION_ROUTE,
    POST_ROUTE
} from "./utils/consts";
import Post from "./pages/Post";
import Auth from "./pages/Auth";
import Organization from "./pages/Organization";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: POST_ROUTE + '/:id',
        Component: Post
    },
    {
        path: ORGANIZATION_ROUTE,
        Component: Organization
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]
