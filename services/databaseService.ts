import { database } from "./appwrite";

type DocData = { 
    text: string,
    createdAt?: string
}

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
    async createDocument(dbId: string, colId: string, data: DocData, id: string | null = null) {
        try {
            return await database.createDocument(dbId, colId, id as string, data);
        } catch (error: unknown) {
            console.log("Error creating document:", error instanceof Error ? error.message : error);
            return {
                error: error instanceof Error ? error.message : String(error)
            }
        }
    },
    // Delete document
    async deleteDocument(dbId: string, colId: string, docId: string) {
        try {
            await database.deleteDocument(dbId, colId, docId);
            return {
                success: true
            }
        }
        catch (error) {
            console.log("Error deleting document:", error instanceof Error ? error.message : error);
            return {
                error: error instanceof Error ? error.message : String(error)
            }
        }
    },
    //update document
    async updateDocument(dbId: string, colId: string, id: string, data: DocData) {
        try {
            await database.updateDocument(dbId, colId, id, data);
            return {
                success: true
            }
        }
        catch (error) {
            console.log("Error updating document:", error instanceof Error ? error.message : error);
            return {
                error: error instanceof Error ? error.message : String(error)
            }
        }
    }
}

export default databaseService;