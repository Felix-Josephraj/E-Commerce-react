import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { logout, isAuthenticated, user, loginWithRedirect, isLoading } =
    useAuth0()

  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user)
      document.cookie = `userValue=${user}`
      console.log(`user:${JSON.stringify(user)}`)
      const tempUser = JSON.stringify(user)
      console.log(JSON.parse(tempUser))
    } else {
      setMyUser(false)
    }
    console.log(document.cookie)
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
