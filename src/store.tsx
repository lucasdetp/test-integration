import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Note } from './components/note';

interface StoreContextProps {
  notes: Note[];
  addNote: (newNote: Note) => void;
  editNote: (editedNote: Note) => void;
  deleteNote: (noteId: string) => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const useStore = (): StoreContextProps => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const editNote = (editedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const store: StoreContextProps = {
    notes,
    addNote,
    editNote,
    deleteNote,
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};