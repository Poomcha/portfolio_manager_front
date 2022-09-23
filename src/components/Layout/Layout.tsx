interface PropsInterface {
    children?: JSX.Element
}

export default function Layout({children}: PropsInterface): JSX.Element {
    return <div className="layout">
        {children}
    </div>
}