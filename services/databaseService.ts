import { database } from "./appwrite";

const databaseService = {
    //List documents
    async listDocuments(dbId: string, colId: string) {
        try {
            const response = await database.listDocuments(dbId, colId);
            return response.documents || [];
        } catch (error: unknown) {
            console.error("Error fetching documents:", error instanceof Error ? error.message : error)
            return {
                error: error instanceof Error ? error.message : String(error)
            }
        }
    },
    // Create document 
    async createDocument(dbId: string, colId: string, data: any, id: string | null = null) {
        try {
            return await database.createDocument(dbId, colId, id as string, data);
        } catch (error: unknown) {
            console.log("Error creating document:", error instanceof Error ? error.message : error);
            return {
                error: error instanceof Error ? error.message : String(error)
            }
        }
    }
}

export default databaseService;