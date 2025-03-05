import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import { useState } from "react";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";

const NotesScreen = () => {
    const [notes, setNotes] = useState([
        {id: "1", text: "Note One"},
        {id: "2", text: "Note Two"},
        {id: "3", text: "Note Three"},
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");

    const toggleModal = () => {
        setModalVisible((prevModal) => !prevModal)
    }

    const addNoteHandler = () => {
        setNotes((prevNotes) => [...prevNotes, {id: Math.random().toString(), text: newNote}])
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