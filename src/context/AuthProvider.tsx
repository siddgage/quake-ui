import { createContext, useState, FC } from "react";

interface AuthContextProps {
    isAuthenticated: boolean,
    token: string | null,
    role: string | null
}

interface AuthContextType extends AuthContextProps {
    setAuth: React.Dispatch<React.SetStateAction<AuthContextProps>>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }): React.ReactNode => {
    const [auth, setAuth] = useState<AuthContextProps>({
        isAuthenticated: false,
        token: null,
        role: null,
    });


    return (
        <AuthContext.Provider value={{ ...auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;