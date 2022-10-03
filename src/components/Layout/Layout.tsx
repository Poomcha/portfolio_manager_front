import Header from "../Header/Header"
import Nav from "../Nav/Nav"

interface PropsInterface {
    children?: JSX.Element
}

export default function Layout({children}: PropsInterface): JSX.Element {
    return <>
            <Header />
            <Nav />
        <main>
            { children }
        </main>
    </>
}