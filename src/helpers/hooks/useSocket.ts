import { useEffect } from "react"

export default (func: React.EffectCallback) => {
    useEffect(func, []);
}