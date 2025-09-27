import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    }
])

export default function Router() {
    return <>
        <Header/>
        <RouterProvider router={router}/>
        <Footer/>
    </>
}