import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Usercontext } from "../Context/User.context"

export default function ProtectedRoute({ children }) {
    let {token} = useContext(Usercontext)
    if (token) {
        return children
    }else{
        return <Navigate to={'/login'}/>
    }
}
