import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { NoteList, AddNoteModal } from "@/components";
import noteService from "../../services/noteService"

type Note = {
    $id: string;
    text: string;
}

const NotesScreen = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const toggleModal = () => {
        setModalVisible((prevModal) => !prevModal)
    }

    const addNoteHandler = () => {
        setNotes((prevNotes) => [...prevNotes, {$id: Math.random().toString(), text: newNote}])
        toggleModal();
    }

  return (
    <View style={styles.container}>
        <NoteList notes={notes} />
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
        <AddNoteModal 
            modalVisible={modalVisible}
            toggleModal={toggleModal}
            newNote={newNote}
            setNewNote={setNewNote}
            addNoteHandler={addNoteHandler}
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
 
})

export default NotesScreen