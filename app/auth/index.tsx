import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const AuthScreen = () => {
    const {login, register} = useAuth();
    
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (text: string, field: string) => {
        setCredentials({...credentials, [field]: text})
    }

    const handleAuth = async () => {
        if(!credentials.email.trim() || !credentials.password.trim()) {
            setError("Email and password are required");
            return;
        }

        if(isRegistering && credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match");
            return
        }
        let response;

        if(isRegistering) {
            response = await register(credentials.email,  credentials.password);
        }
        else {
            response = await login(credentials.email, credentials.password);
        }

        if(response.error) {
            Alert.alert("Error", response.error);
        }
        router.replace("/notes");
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>{isRegistering ? "Sign Up" : "Login"}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"#aaa"}
                value={credentials.email}
                onChangeText={(e) => handleChange(e, "email")}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"#aaa"}
                value={credentials.password}
                onChangeText={(e) => handleChange(e, "password")}
                secureTextEntry
                textContentType="none"
            />
            {isRegistering && (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={"#aaa"}
                value={credentials.confirmPassword}
                onChangeText={(e) => handleChange(e, "confirmPassword")}
                secureTextEntry
                textContentType="none"
            />
            )}
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegistering ? "Sign Up" : "Login"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering((prevRegistering) => !prevRegistering)}>
                <Text style={styles.switchText}>{isRegistering ? "Already have an account? Login" : "Don´t have an account? Sign Up"}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333"
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    switchText: {
        marginTop: 10,
        color: "#007bff",
        fontSize: 16
    },
    error: {
        color: "red",
        marginBottom: 10,
        fontSize: 16
    }
})

export default AuthScreen;

