import { FlatList } from 'react-native'
import NoteItem from './NoteItem'
import {type Note} from "@/types"
import { View, Text, StyleSheet } from 'react-native'

type NoteListProps = {
   notes: Note[],
   onDelete: (id: string) => void,
   onEdit: (id: string, text: string) => Promise<void>
}

const NoteList = ({notes, onDelete, onEdit}: NoteListProps) => {
  if(notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notes found</Text>
      </View>
    )
  }
  return (
    <FlatList 
      data={notes}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
    marginTop: 10
  }
})

export default NoteList