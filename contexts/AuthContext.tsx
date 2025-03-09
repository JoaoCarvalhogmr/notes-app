import { createContext, useContext, useState, useEffect } from "react";
import authService from "@/services/authService";

type AuthContextProps = {
    user: any;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    isLoading: false,
    login: async () => ({}),
    register: async () => ({}),
    logout: async () => {}
});


export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    },[])

    const checkUser = async() => {
        setIsLoading(true);

        const response = await authService.getUser();

        if(response?.error) {
            setUser(null)
        }
        else {
            setUser(response)
        }
        setIsLoading(false);
    }

    const login = async(email: string, password: string) => {
        const response = await authService.loginUser(email, password);

        if(response?.error) {
            return response;
        }
        await checkUser();
        return {
            success: true
        }
    }

    const register = async(email: string, password: string) => {
        const response = await authService.registerUser(email, password);

        if(response?.error) {
            return response;
        }
        
        return login(email, password);
    }

    const logout = async() => {
        await authService.logout();
        setUser(null);
        await checkUser();
    }

    return (
        <AuthContext.Provider value={{user, isLoading, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context;
}