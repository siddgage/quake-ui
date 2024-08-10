import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


const useAuth = (): boolean => {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error("useAuth must be used within an AuthProvider");

    return context.isAuthenticated;
}

export default useAuth