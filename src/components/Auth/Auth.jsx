import { useEffect } from "react"

const Auth = () => {

    useEffect(() => {
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=eacca3682f374561b43cfc4991784ea7`;
    },[])

    return (
        <div>
    
        </div>
    )
}

export default Auth;