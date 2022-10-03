import { useContext } from "react"
import  { LoginContext } from "../../App"
import Logout from "../Logout/Logout"
import './header.css'



export default function Header() {
    const login = useContext(LoginContext)
    return <header className="header">
        <h1 className="header__title">portfolio manager</h1>
        {
            login && <Logout />
        }
    </header>
}