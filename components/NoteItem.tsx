import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { useState, useRef } from "react"

export type NoteItemProps = {
  note: {
    text: string,
    $id: string,
  },
  onDelete: (id: string) => void,
  onEdit: (id: string, text: string) => Promise<void>
}

const NoteItem = ({note,onDelete, onEdit}: NoteItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText ,setEditedText] = useState(note.text);
  const inputRef = useRef<TextInput>(null);

  const handleSave = () => {
    if(editedText.trim() === "") {
      return;
    }
    
    onEdit(note.$id, editedText)
    setIsEditing(false)
  }

  return (
    <View style={styles.noteItem}>                    
    {isEditing ? (
      <TextInput
        ref={inputRef}
        value={editedText}
        onChangeText={setEditedText}
        autoFocus
        onSubmitEditing={handleSave}
        style={styles.input}
        returnKeyType="done"
      />
    ) : (
      <Text style={styles.noteText}>{note.text}</Text>
    )}
    <View style={styles.actions}>
      {isEditing ? (
        <TouchableOpacity onPress={() => {
          handleSave()
          inputRef.current?.blur()
        }}>
          <Text style={styles.edit}>💾</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>


    </View>  )
}

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
},
  noteText: {
    fontSize: 18
  },
  delete: {
    fontSize: 18,
    color: "red"
  },
  actions: {
    flexDirection: "row",
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: "blue"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  }

})

export default NoteItem