import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { NoteList, AddNoteModal } from "@/components";
import noteService from "../../services/noteService"
import React from "react";


type Note = {
    $id: string;
    text: string;
}

const NotesScreen = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNotes();
    },[])

    const fetchNotes = async() => {
        setLoading(true);
        const response = await noteService.getNotes();

        if(response.error) {
            setError(response.error);
            Alert.alert("Error", response.error)
        }

        else {
            const mappedNotes = Array.isArray(response.data) 
                ? response.data.map(doc => ({ $id: doc.$id, text: doc.text })) 
                : [];
            setNotes(mappedNotes);
            setError(null)
        }

        setLoading(false);
    }

    const addNote = async() => {
        if(newNote.trim() === "") {
            return;
        }
        const response = await noteService.addNote(newNote);

        if(response.error) {
            setError(response.error);
            Alert.alert("Error", response.error)
            return;
        }
        
        else {
            if (response.data) {
                const newNote = { $id: response.data.$id, text: response.data.text };
                setNotes((prevNotes) => [...prevNotes, newNote]);
                setNewNote("");
                toggleModal();
            }
        }
    }
    //delete note
    const deleteNote = async(id: string) => {
        Alert.alert("Delete Note", "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async() => {
                        const response = await noteService.deleteNote(id);
                        if(response.error) {
                            Alert.alert("Error", response.error);
                            return;
                        }
                        else {
                            setNotes(prevNotes => prevNotes.filter(note => note.$id !== id));
                        }
                    }
                }
            ]
        )
    }

    const editNote = async(id: string, text: string ) => {
        if(!text.trim()) {
            Alert.alert("Error", "Note text cannot be empty");
            return;
        }

        const response = await noteService.updateNote(id, text);

        if(response.error) {
            setError(response.error);
            Alert.alert("Error", response.error)
            return;
        }
        
        else {
            setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? {...note, text} : note))
        }
    }

    const toggleModal = () => {
        setModalVisible((prevModal) => !prevModal)
    }

 

  return (
    <View style={styles.container}>
        {loading ? (<ActivityIndicator size={"large"} color="#007bff" />) : (
            <>
                {error  && <Text style={styles.errorText}>{error}</Text>}
                <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
            </>
        )
        }
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
        <AddNoteModal 
            modalVisible={modalVisible}
            toggleModal={toggleModal}
            newNote={newNote}
            setNewNote={setNewNote}
            addNoteHandler={addNote}
        />
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    addButton: {
        position:"absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center"
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16
    }
 
})

export default NotesScreen