import React, { useState } from 'react';
import { MdDeleteForever, MdPushPin, MdEdit, MdContentCopy, MdCheck } from 'react-icons/md';

const colors = ['#fef68a', '#ffc0cb', '#a7f3d0', '#bfdbfe', '#e5e7eb'];

const Note = ({ id, text, date, color, isPinned, handleDeleteNote, handleEditNote, handleTogglePin, handleChangeColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [copied, setCopied] = useState(false);

  const handleSaveEdit = () => {
    if (editText.trim().length > 0) {
      handleEditNote(id, editText);
      setIsEditing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return(
    <div className="note" style={{ backgroundColor: color }}>
      {isEditing ? (
        <textarea 
          className="edit-textarea"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
        />
      ) : (
        <span className="note-text">{text}</span>
      )}
      
      <div className="color-picker">
        {colors.map(c => (
          <div 
            key={c}
            className={`color-dot ${color === c ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => handleChangeColor(id, c)}
          />
        ))}
      </div>

      <div className="note-footer">
        <small>{date}</small>
        <div className="note-actions">
          {copied ? (
            <MdCheck className="action-icon" size="1.2em" color="green" />
          ) : (
            <MdContentCopy className="action-icon" size="1.2em" onClick={handleCopy} title="Copy" />
          )}

          {isEditing ? (
            <MdCheck className="action-icon" size="1.3em" onClick={handleSaveEdit} title="Save Edit" color="green" />
          ) : (
            <MdEdit className="action-icon" size="1.3em" onClick={() => setIsEditing(true)} title="Edit" />
          )}

          <MdPushPin 
            className={`action-icon pin-icon ${isPinned ? 'pinned' : ''}`} 
            size="1.3em" 
            onClick={() => handleTogglePin(id)} 
            title={isPinned ? "Unpin Note" : "Pin Note"}
          />
          <MdDeleteForever 
            onClick={() => handleDeleteNote(id)}
            className="action-icon delete-icon" 
            size="1.4em" 
            title="Delete Note"
          />
        </div>
      </div>
    </div>
  )
};

export default Note;