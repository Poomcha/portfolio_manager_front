import React, { useState } from "react"
import client from "../../feathers"

interface PropsInterface {
    loading: boolean,
}

export default function Login(props: PropsInterface): JSX.Element {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState();

    const login = () => (
        client.authenticate({
            strategy: 'local',
            ...form
        }).catch((err: Error) => console.log(err))
    )

    const handleChange = (e: React.BaseSyntheticEvent): void => {
        if (e.target.id === "email") {
            setForm(prevForm => {
                return { ...prevForm, email: e.target.value }
            })
        }
        if (e.target.id === "password") {
            setForm(prevForm => {
                return { ...prevForm, password: e.target.value }
            })
        }
    }

    const handleSubmit = (e: React.BaseSyntheticEvent): void => {
        e.preventDefault();
        login();
    }

    return <form id="login" className="login" onSubmit={handleSubmit}>
        <div className="login__inputcontainer">
            <label htmlFor="email" className="login__inputcontainer__label">email</label>
            <input 
                type="email"
                id="email"
                name="email"
                autoComplete="on" 
                className="login__inputcontainer__input"
                placeholder="example@domain.com"
                value={form.email}
                required
                onChange={handleChange}
            />
        </div>
        <div className="login__inputcontainer">
            <label htmlFor="password" className="login__inputcontainer__label">mot de passe</label>
            <input 
                type="password"
                id="password"
                name="password"
                autoComplete="on" 
                className="login__inputcontainer__input"
                placeholder="motdepasse"
                value={form.password}
                required
                onChange={handleChange}
            />
        </div>
        <div className="login__inputcontainer">
            <input 
                type="submit"
                name="submit"
                value="se connecter"
            />
        </div>
        { props.loading && <div>
            L
            O
            A
            D
            I
            N
            G
        </div> }
        
    </form>
}