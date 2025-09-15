import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Main Page</p>,
        errorElement: <p>Error</p>
    }
])

export default function Router() {
    return <RouterProvider router={router}/>
}