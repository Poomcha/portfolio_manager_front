import { useContext } from "react"
import  { UserContext } from "../../App"
import Logout from "../Logout/Logout"
import './header.css'



export default function Header() {
    const user = useContext(UserContext)
    return <header className="header">
        <h1 className="header__title">portfolio manager</h1>
        {
            user && <Logout />
        }
    </header>
}