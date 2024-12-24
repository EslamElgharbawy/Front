import { useState } from "react"

export default function useOnline() {
    let [isOnline, setisOnline] = useState(true)
    window.addEventListener("online", () => {
        setisOnline(true)
    })
    window.addEventListener("offline", () => {
        setisOnline(false)
    })

    return isOnline
}
