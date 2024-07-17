import { useEffect } from "react"

const Auth = () => {

    useEffect(() => {
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=90eec8d18ad841e786c292d18e1ce611`;
    },[])

    return (
        <div>

        </div>
    )
}

export default Auth;