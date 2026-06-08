import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import TestSelect from "../pages/TestSelect";
import Exam from "../pages/Exam";
import Result from "../pages/Result";

export const router = createBrowserRouter([{
    path: '/login',
    element: <Login/>
},
{
    path: '/signup',
    element: <Signup/>
}, {
    path: "/",
    element:<Home/>
}, {
    path: '/testselect',
    element: <TestSelect/>
}, {
    path: "/exam/:title",
    element: <Exam/>
},  {
    path: "result/:id",
    element:<Result/>
}
])