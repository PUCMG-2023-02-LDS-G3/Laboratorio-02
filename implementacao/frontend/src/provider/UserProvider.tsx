import { createContext, useCallback } from "react"
import { useLocalState } from "../Utils/useLocalStorage"

interface UserContextData {
  user: {
    email: string
    password: string
  }
  SingIn: (email: string, password: string) => void
  SingOut: () => void,
  isUserLogged: () => boolean
}

interface UserProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextData)

function UserProvider({ children }: UserProviderProps) {

    const [user, setUser] = useLocalState("@user", { email: "", password: "" })

    const SingIn = (email: string, password: string) => {
      setUser({ email, password })
    }

    const SingOut = () => {
      localStorage.removeItem("@user")
    }

    const isUserLogged = useCallback(() => {
      return user.email !== "" && user.password !== ""
    }, [user])

  return <UserContext.Provider value={{SingIn, SingOut, user, isUserLogged}}>{children}</UserContext.Provider>
}

export default UserProvider
