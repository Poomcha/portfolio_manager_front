import { createContext, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Layout from './components/Layout/Layout';
import client from './feathers';

const usersService = client.service('users')
const projectsService = client.service('projects')

interface UserInterface {
  accessToken: string,
  authentication: {
    accessToken: string,
    payload: {
      aud: string,
      exp: number,
      iat: number,
      iss: string,
      jti: string,
      sub: string,
    }
    startegy: string,
  }
  user: {
    admin: boolean,
    email: string,
    portfolio: string,
    _id: string,
  }
}

const UserContext = createContext<UserInterface | undefined | null>(undefined)

function App() {
  const [login, setLogin] = useState(null);
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Try to authenticate with the JWT stored in localstorage
    client.authenticate().catch(() => {
      setLogin(null)
    });

    // Successful login
    client.on('authenticated', (loginResult: any): void => {
      // Case user is admin
      if (loginResult.user.admin) {
        // Get all users except admin
        Promise.resolve(
          usersService.find({
            query: {
              $sort: {
                updatedAt: 1
              },
              $limit: 15,
              admin: false,
            }
          })
        ).then((resUsers) => {
          // Set result from login and users service
          setLogin(loginResult);
          setUsers(resUsers.data)
        });
      }
      // Case normal user
      else {
        const userId = loginResult.user._id;
        // Get user and his projects
        Promise.all([
          usersService.get(
            userId, {}
          ),
          projectsService.find({
            query: {
              userId: userId,
              $sort: { updatedAt: -1 },
              $limit: 20,
            }
          })
        ]).then(([userRes, projectsRes]) => {
          setLogin(loginResult);
          setUsers(userRes);
          setProjects(projectsRes.data);
        });
      }
    })

    // On logout reset all local state
    client.on('logout', () => {
      setLogin(null);
      setUsers([]);
      setProjects([]);
    })

    // Add new users to the user list
    usersService.on('created', (user: any) =>
      setUsers(prevUsers => prevUsers.concat(user))
    );

    // Add new projects to the project list
    projectsService.on('created', (project: any) =>
      setProjects(prevProjects => prevProjects.concat(project))
    );

  })

  if (login) {
    return (
      <UserContext.Provider value={login}>
        <Layout></Layout>
      </UserContext.Provider>  
    )
  } 

  return (
    <UserContext.Provider value={login}>
      <Layout>
        <Auth loading={login === undefined} setLogin={setLogin} />
      </Layout>
    </UserContext.Provider>
  )
}

export { App, UserContext };
