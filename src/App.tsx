/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react';
import './App.css';
import NoteForm, { Note } from './components/note';
import NoteDetails from './components/noteDetails';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Récupérer les notes depuis le localStorage lors du chargement initial de l'application
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNoteCreate = (newNote: Note) => {
    setNotes([...notes, newNote]);
    console.log('Nouvelle note créée:', newNote);

    // Sauvegarder les notes dans le localStorage
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);

    // Sauvegarder les notes mises à jour dans le localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleNoteDelete = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    // Sauvegarder les notes mises à jour dans le localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <>
      <div>
        <NoteForm onNoteCreate={handleNoteCreate} />
        <h2>Liste des notes :</h2>
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <NoteDetails
                  note={note}
                  onNoteEdit={handleNoteUpdate}
                  onNoteDelete={handleNoteDelete}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune note pour le moment.</p>
        )}
      </div>
    </>
  );
}

export default App;