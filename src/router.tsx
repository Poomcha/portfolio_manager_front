import { createBrowserRouter } from "react-router-dom"
import Users from "./components/Users/Users"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Users />
    },
    {
        path: "/:userId",
        element: <div>UserManager</div> 
    },
    {
        path: "/createuser",
        element: <div>CreateUser</div>
    }
])

export default router;