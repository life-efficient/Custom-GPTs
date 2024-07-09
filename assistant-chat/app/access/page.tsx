"use client"
import { useRouter } from "next/navigation"

const StoreAccessToken = () => {
    // http://localhost:3000/access#state=state_parameter_passthrough_value&access_token=ya29.a0AXooCgtqWKVEVHo7xMTEA9GIjtzTSHZbZhtce9EPrSHHFu03Jsl3vc1BjrQFWPwkEDNmwmNqpbQW4XoyL76gZb5zNC5MvoROPw1arM0GORkyJe4G0g1L_1PEBpH9OUmUZu5W0L_TcobxmVc62_0oukwIUHGG2CJQ0pUaCgYKAW0SARMSFQHGX2MitwBTHSJtZDDCGN3mzup7rQ0170&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/spreadsheets%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/drive
    // get url query params
    const params = new URLSearchParams(window.location.hash)
    console.log(params)
    console.log(params.get('access_token'))
    // store access token in localstorage
    localStorage.setItem('access_token', params.get('access_token')) // TODO store as `${toolName}-access_token` in localstorage to allow multiple access token storage
    // redirect back to correct agent and state
    const router = useRouter()
    router.push('/chat/example') // TODO replace with correct agent and state
    return "hello world"
}

export default StoreAccessToken