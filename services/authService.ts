import {account} from "./appwrite"
import { ID } from "react-native-appwrite"

const authService = {
    //register a user 
    async registerUser(email: string, password: string) {
        try {
            const response = await account.create(ID.unique(), email, password)
            return response;
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Registration failed. Please try again."
            }
        }    
    },
    //login a user
    async loginUser(email: string, password: string) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response; 
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Login failed. Please check your credentials again."
            }
        }
    },
    //get logged in user
    async getUser () {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },
    //logout
    async logout() {
        try {
            return await account.deleteSession("current");
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Logout failed. Please try again"
            }
        }
    }
}

export default authService;

