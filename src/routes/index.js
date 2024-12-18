import Layout from "../Layout/Layoutdefault";
import Quiz from "../page/Quiz";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home";
import Topic from "../page/Topic";
import Answers from "../page/Answers"
import Result from "../page/Result";
import Private from "../component/privateRouter";
import LogOut from "../page/Logout";

export const routes =[
    {
        path:"/",
        element: <Layout/>,
        children: [
            {
                path:"/",
                element: <Home/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path:"login",
                element: <Login/>,
            },
            {
                path:"logout",
                element: <LogOut/>,
            },
            {
                element: <Private/>,
                children: [
                    {
                        path:"topic",
                        element: <Topic/>
                    },
                    {
                        path:"answers",
                        element: <Answers/>
                    },
                    {
                        path:"result/:id",
                        element: <Result/>
                    },
                    {
                        path:"quiz/:id",
                        element: <Quiz/>
                    }
                ]
            }

        ]
    }
]