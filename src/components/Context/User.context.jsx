import { useFormik } from "formik"
import { createContext, useState } from "react"

export const Usercontext = createContext(null)

export default function UserProvider({ children }) {
    let [token, setToken] = useState(localStorage.getItem("token"))

   
    function logout() {
        setToken(null)
        localStorage.removeItem("token")
    }

   
   






    return <>
        <Usercontext.Provider value={{token, setToken, logout }}>
            {children}
        </Usercontext.Provider>
    </>
}
