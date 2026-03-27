import React, { useState } from 'react';

const colors = ['#fef68a', '#ffc0cb', '#a7f3d0', '#bfdbfe', '#e5e7eb'];

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const characterLimit = 300;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText, selectedColor);
      setNoteText('');
      setSelectedColor(colors[0]);
    }
  };

  return (
    <div className="note new" style={{ backgroundColor: selectedColor }}>
      <textarea 
        rows="8" 
        cols="10" 
        placeholder="Type to add a new note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      
      <div className="color-picker">
        {colors.map(c => (
          <div 
            key={c}
            className={`color-dot ${selectedColor === c ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setSelectedColor(c)}
          />
        ))}
      </div>

      <div className="note-footer">
        <small>{characterLimit - noteText.length} Remaining</small>
        <button className="save" onClick={handleSaveClick} disabled={noteText.trim().length === 0}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AddNote;