import React, { useState, FormEvent } from 'react';

interface NoteFormProps {
  onNoteCreate: (newNote: Note) => void;
}

export interface Note {
  id: string;
  title: string;
  note: string;
  comment: string;
  createdAt: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteCreate }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [comment, setComment] = useState('');

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const id = Date.now().toString();

    const newNote: Note = {
      id,
      title,
      note,
      comment,
      createdAt: new Date().toLocaleString(),
    };

    onNoteCreate(newNote);

    setTitle('');
    setNote('');
    setComment('');

    const existingNotes = localStorage.getItem('notes');
    const notes = existingNotes ? JSON.parse(existingNotes) : [];

    notes.push(newNote);

    localStorage.setItem('notes', JSON.stringify(notes));
  };

  return (
    <div className="card">
      <h2>Ajouter une note</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="note">Note :</label>
          <input
            type="number"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Commentaire :</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default NoteForm;