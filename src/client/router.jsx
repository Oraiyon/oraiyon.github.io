import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Profile from "./components/Profile";
import User from "./components/User";
import Comments from "./components/Comments";
import Likes from "./components/Likes";
import Account from "./components/Account";
import Post from "./components/Post";
import EditAccount from "./components/EditAccount";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Search />
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/feed",
          element: <Feed />
        },
        {
          path: "/:id/profile",
          element: <Profile />
        },
        {
          path: "/:postId/comments",
          element: <Comments />
        },
        {
          path: "/:postId/likes",
          element: <Likes />
        },
        {
          path: "/user",
          element: <User />
        },
        {
          path: "/user/account",
          element: <Account />
        },
        {
          path: "/user/account/edit",
          element: <EditAccount />
        },
        {
          path: "/post",
          element: <Post />
        }
      ]
      // errorElement
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
