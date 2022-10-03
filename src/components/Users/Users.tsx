import './users.css'
import { UsersContext } from '../../App'
import { useContext } from 'react'
import User from '../User/User'

export default function Users() {
    const users = useContext(UsersContext).map(
        user => <User
                    key={user._id}
                    _id={user._id}
                    email={user.email}
                    admin={user.admin}
                    createdAt={user.createdAt}
                    updatedAt={user.updatedAt}
                    __v={user.__v}
                    portfolio={user.portfolio}
                />
    )

    return <article className='users'>
        <h2 className='users__title'>utilisateurs</h2>
        <div className='users__ctn'>
            {users}
        </div>
    </article>
}