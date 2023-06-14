import React, { FormEvent, useState } from 'react';
import { Note } from './note';

interface NoteDetailsProps {
  note: Note;
  onNoteEdit: (note: Note) => void;
  onNoteDelete: (noteId: string) => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note, onNoteEdit, onNoteDelete }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleEdit = () => {
    setIsEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setIsEditPopupOpen(false);
    setEditedNote({ ...note });
  };

  const handleEditFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNoteEdit(editedNote);
    setIsEditPopupOpen(false);
  };

  const handleDelete = () => {
    onNoteDelete(note.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const noteValue = parseFloat(note.note);

  const noteClass = noteValue < 8
    ? 'note red'
    : noteValue < 10
    ? 'note orange'
    : noteValue < 13
    ? 'note yellow'
    : 'note green';

  const getPartialComment = (comment: string, maxLength: number) => {
    if (comment.length <= maxLength) {
      return comment;
    } else {
      return comment.substring(0, maxLength) + '...';
    }
  };

  return (
    <div className={`cards ${noteClass}`}>
      <h3>{note.title}</h3>
      <p>{note.note}</p>
      <p>{getPartialComment(note.comment, 10)}</p>
      <p>{note.createdAt}</p>
      <button onClick={handleEdit}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>

      {isEditPopupOpen && (
        <div className='popup'>
          <h2>Modifier la note</h2>
          <form onSubmit={handleEditFormSubmit}>
            <div>
              <label htmlFor="title">Titre :</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editedNote.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="note">Note :</label>
              <input
                type="text"
                id="note"
                name="note"
                value={editedNote.note}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="comment">Commentaire :</label>
              <textarea
                id="comment"
                name="comment"
                value={editedNote.comment}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Enregistrer</button>
            <button onClick={handleEditPopupClose}>Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;