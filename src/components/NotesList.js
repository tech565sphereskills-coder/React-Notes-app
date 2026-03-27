import React from 'react';
import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleEditNote, handleTogglePin, handleChangeColor }) => {
  // Sort notes: pinned first
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className='notes-list'>
      <AddNote handleAddNote={handleAddNote} />
      {sortedNotes.map((note) => (
        <Note 
          key={note.id}
          id={note.id} 
          text={note.text} 
          date={note.date} 
          color={note.color}
          isPinned={note.isPinned}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
          handleTogglePin={handleTogglePin}
          handleChangeColor={handleChangeColor}
        />
      ))}
    </div>
  );
};
export default NotesList;