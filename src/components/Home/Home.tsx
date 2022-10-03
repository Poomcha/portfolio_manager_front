import { RouterProvider } from "react-router-dom"
import router from "../../router"

export default function Home(): JSX.Element {
    return <div className="home">
        <RouterProvider router={router} />
    </div>
}