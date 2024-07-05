"use client"
import { useSearchParams, useRouter } from "next/navigation"

const StoreAccessToken = () => {
    // get url query params
    const params = useSearchParams()
    // store access token in localstorage
    localStorage.setItem('access_token', params.get('access_token'))
    // redirect back to correct agent and state
    const router = useRouter()
    router.push('/chat/calendar')
    return "hello world"
}

export default StoreAccessToken