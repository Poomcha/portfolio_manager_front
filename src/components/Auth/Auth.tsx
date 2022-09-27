import React, { useState } from "react"
import client from "../../feathers"
import './auth.css'
import { FeathersError } from "@feathersjs/errors"

interface PropsInterface {
    loading: boolean,
    setLogin: React.Dispatch<React.SetStateAction<any>>,
}

export default function Login(props: PropsInterface): JSX.Element {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState<FeathersError>();

    const login = () => (
        client.authenticate({
            strategy: 'local',
            ...form
        }).catch((err: FeathersError) => {
            setError(err)
        })
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
        props.setLogin(undefined)
        login();
    }

    return (<div className="login_wrapper">
            <h2 className="login_title">connexion</h2>
            <form id="login" className="login_form" onSubmit={handleSubmit}>
            <div className="login_form__inputcontainer">
                <label htmlFor="email" className="login_form__inputcontainer__label">email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="on" 
                    className="login_form__inputcontainer__input"
                    placeholder="example@domain.com"
                    value={form.email}
                    required
                    onChange={handleChange}
                />
            </div>
            <div className="login_form__inputcontainer">
                <label htmlFor="password" className="login_form__inputcontainer__label">mot de passe</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="on" 
                    className="login_form__inputcontainer__input"
                    placeholder="motdepasse"
                    value={form.password}
                    required
                    onChange={handleChange}
                />
            </div>
            {
                props.loading && <div className="login_form__loader">
                    <div className="wave_1 wave"></div>
                    <div className="wave_2 wave"></div>
                    <div className="wave_3 wave"></div>
                    <div className="base"></div>
                </div>
            }
            {
                error && <div className="login_form__error">
                    {
                        error.code === 401 ?
                            "email ou mot de passe incorrect." :
                                "le serveur ne répond pas."
                    }
                </div>
            }
            <div 
                className="login_form__inputcontainer login_form__inputcontainer--button">
                <button 
                    type="submit"
                    name="submit"
                    className="button"
                >
                    <span className="button__text">se connecter</span>
                </button>
            </div>
        </form>
    </div>)
}