import { FlatList } from 'react-native'
import NoteItem from './NoteItem'
import {type Note} from "@/types"

type NoteListProps = {
   notes: Note[],
   onDelete: (id: string) => void,
   onEdit: (id: string, text: string) => Promise<void>
}

const NoteList = ({notes, onDelete, onEdit}: NoteListProps) => {
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

export default NoteList