import "./logout.css"
import client from "../../feathers"

export default function Logout() {
    const logout = (): void => {
        client.logout();
    }

    return <div className="logout" onClick={logout}>
        <span>déconnexion</span>
        <i className="fa-solid fa-power-off logout__icon"></i>
    </div>
}