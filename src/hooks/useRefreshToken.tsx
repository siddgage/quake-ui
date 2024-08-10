import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios";


const useRefreshToken = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useAuth must be used within an AuthProvider");

    const { setAuth } = context

    const refresh = async () => {

        await axios.get(
            '/user/auth/refresh', {
            withCredentials: true
        }
        ).then(response => {
            const newToken = response.data.token;

            setAuth(prev => ({
                ...prev,
                token: newToken
            }));

            return newToken;
        }
        ).catch(error => console.error('Error refreshing token:', error))
    }
    return refresh
}

export default useRefreshToken