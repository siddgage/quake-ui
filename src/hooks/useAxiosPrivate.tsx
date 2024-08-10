import { useEffect } from "react"
import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"


const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const reqInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${auth.token}`
                return config
            }, error => Promise.reject(error)
        )

        const resInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config
                if (error.response?.status === 403 && prevReq?.sent) {
                    prevReq.sent = true
                    const newToken = await refresh()
                    prevReq.headers['Authorization'] = `Bearer ${newToken}`
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(reqInterceptor)
            axiosPrivate.interceptors.response.eject(resInterceptor)
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate