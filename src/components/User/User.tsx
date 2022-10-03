import './user.css'
import { UserInterface } from '../../App'
import { prettyDate } from '../../scripts/utils'

export default function User(props: UserInterface) {
    return <div className="user">
        <section className='user__section'>
            <h3 className='user__section__email'>{props.email}</h3>
            <ul className='user__section__infos'>
                <li><span>créé le</span> {prettyDate(props.createdAt)}</li>
                <li><span>modifié le</span> {prettyDate(props.updatedAt)}</li>
                <li><span>adresse url</span> {props.portfolio || "https://example.com"}</li>
            </ul>
        </section>
        <section className='user__project'>
            <span>nombre de projets </span>
            <span>modifié le </span>
        </section>
    </div>
}