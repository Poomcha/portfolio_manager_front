import Header from "../Header/Header"

interface PropsInterface {
    children?: JSX.Element
}

export default function Layout({children}: PropsInterface): JSX.Element {
    return <>
            <Header />
        <main>
            { children }
        </main>
    </>
}