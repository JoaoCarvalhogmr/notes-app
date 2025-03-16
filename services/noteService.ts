import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

//Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes(userId: string) {
        if(!userId) {
            console.error("Error: Missing user id in getNotes")
            return {
                data: [],
                error: "User ID is missing"
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId as string, colId as string, [
                Query.equal("user_id", userId)
            ]);

            return response;
    
        } catch (error: unknown) {
            console.log("Error fetching notes:", error instanceof Error ? error.message : String(error));
            return {
                data: [],
                error: error instanceof Error ? error.message : String(error)
            }
        }
           
    },
    //add new note
    async addNote (text: string, user_id: string) {
        if(!text) {
            return {
                error: "Note text cannot be empty"
            }
        }
        const data = {
            text,
            createdAt: new Date().toISOString(),
            user_id
        }
        
        const response = await databaseService.createDocument(
            dbId as string,
            colId as string,
            data,
            ID.unique()
        );

        if ('error' in response) {
             return {
                error: response.error
            }
        }
        return {
            data: response
        }
    },
    async updateNote(id: string, text: string) {
        const response = await databaseService.updateDocument(dbId as string, colId as string, id, {
            text,
        } );

        if ('error' in response) {
            return {
               error: response.error
           }
       }
       return {
        data: response
       }
    },
    //delete note
    async deleteNote(id: string) {
        const response = await databaseService.deleteDocument(
            dbId as string,
            colId as string,
            id
        )

        if ('error' in response) {
            return {
               error: response.error
           }
       }
       return {
        success: true
       };
    },

}

export default noteService