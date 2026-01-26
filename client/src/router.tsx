import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import AddSubject from "./pages/AddSubject/AddSubject";
import AddTeacherProfile from "./pages/AddTeacherProfile/AddTeacherProfile";
import Profile from "./pages/Profile/Profile";
import SubjectsPage from "./pages/SubjectsPage/SubjectsPage";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import AddStudentProfile from "./pages/AddStudent/AddStudent";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/register",
        element: <RegisterPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/contact",
        element: <ContactPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/category/:category",
        element: <CategoryPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/add-subject",
        element: <AddSubject/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/add-teacher",
        element: <AddTeacherProfile/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/profile",
        element: <Profile/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/category/:category/subject/:subject",
        element: <SubjectsPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/category/:category/subject/:subject/teacher/:id",
        element: <TeacherPage/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/add-student",
        element: <AddStudentProfile/>,
        errorElement: <ErrorPage/>
    }, {
        path: "/change-password",
        element: <ChangePassword/>,
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