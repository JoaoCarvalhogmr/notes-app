import React from 'react'
import { FlatList } from 'react-native'
import { type NoteItemProps as Note} from './NoteItem'
import NoteItem from './NoteItem'

type NoteListProps = {
   notes: Note[]
}
const NoteList = ({notes}: NoteListProps) => {
  return (
    <FlatList 
    data={notes}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
        <NoteItem {...item} />
    )}
/>  )
}

export default NoteList