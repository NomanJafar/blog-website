import RequiresAuthentication from "../utils/AuthenticateHOC";
import PostDetails from "../views/PostDetails";
import UserDetails from "../views/UserDetails";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import PostEditor from "../views/PostEditor";
import MyPosts from "../views/MyPosts";

const appRoutes = [
    {
        path: '/profile',
        Component: RequiresAuthentication(UserDetails)
    },
    {
        path: '/postdetails/:postId',
        Component: PostDetails
    },
    {
        path: '/home',
        Component: Home
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/signup',
        Component: Signup
    },
    {
        path: '/createpost',
        Component: RequiresAuthentication(PostEditor)
    },
    {
        path: '/editpost/:postId',
        Component: RequiresAuthentication(PostEditor)
    },
    {
        path: '/your-posts',
        Component: RequiresAuthentication(MyPosts)
    },

];

export default appRoutes;