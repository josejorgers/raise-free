import { useEffect, useRef } from "react";

export function useClickOutside(callback) {
    const ref = useRef(null)

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
        callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
        document.removeEventListener('click', handleClick)
        }
    }, [])

    return ref
}