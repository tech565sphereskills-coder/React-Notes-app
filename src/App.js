import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes && savedNotes.length > 0) {
      return savedNotes;
    }
    return [
      {
        id: nanoid(),
        text: "Welcome to the premium Notes App!\nTry editing me, changing my color, or pinning me to the top.",
        date: new Date().toLocaleDateString(),
        color: '#fef68a',
        isPinned: false
      }
    ];
  });

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text, color) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
      color: color || '#fef68a',
      isPinned: false
    };
    const newNotes = [newNote, ...notes];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const editNote = (id, newText) => {
    const newNotes = notes.map((note) => 
      note.id === id ? { ...note, text: newText, date: new Date().toLocaleDateString() } : note
    );
    setNotes(newNotes);
  };

  const togglePin = (id) => {
    const newNotes = notes.map((note) => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(newNotes);
  };

  const changeColor = (id, newColor) => {
    const newNotes = notes.map((note) => 
      note.id === id ? { ...note, color: newColor } : note
    );
    setNotes(newNotes);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText.toLowerCase())
          )} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
          handleTogglePin={togglePin}
          handleChangeColor={changeColor}
        />
      </div>
    </div>
  );
};

export default App;