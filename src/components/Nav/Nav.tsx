import "./nav.css"
import React, { useContext } from "react"
import { LoginContext } from "../../App"

export default function Nav() {
    const login = useContext(LoginContext)

    const adminNav = <ul className="nav__ctn">
        <li className="nav__ctn__link">
            <i className="fa-solid fa-users"></i>
            <span className="nav__ctn__link__text">utilisateurs</span>
        </li>
        <li className="nav__ctn__link">
            <i className="fa-solid fa-user-plus"></i>
            <span className="nav__ctn__link__text">créer un utilisateur</span>
        </li>
        <li className="nav__ctn__link">
            <i className="fa-solid fa-gears"></i>
           <span className="nav__ctn__link__text">paramètres</span>
        </li>
    </ul>
    
    const userNav = <></>
    
    if (login) {
        return <nav className="nav">
            {
                login.user.admin ? 
                    adminNav :
                        userNav
            }
        </nav>
    }

    return <React.Fragment></React.Fragment>
}