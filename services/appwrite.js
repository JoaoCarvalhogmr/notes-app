import {Client, Databases} from "react-native-appwrite"
import {Platform} from "react-native";

const config = {
    endpoint: process.env.EXPO_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_APPRWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    col: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
    }
};

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

const database = new Databases(client);

switch(Platform.OS) {
    case "ios": 
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
        break;
    case "android": 
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
        break;
}

export {database, config, client};

