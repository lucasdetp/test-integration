import { render, screen } from '@testing-library/react';
import NoteDetails from './components/noteDetails';

test('renders note details', () => {
  const mockNote = {
    id: '1',
    title: 'Test Note',
    note: '8',
    comment: 'This is a test note',
    createdAt: '2023-06-14',
  };

  render(<NoteDetails note={mockNote} onNoteEdit={jest.fn()} onNoteDelete={jest.fn()} />);


  expect(screen.getByText('Test Note')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('This is a test note')).toBeInTheDocument();
  expect(screen.getByText('2023-06-14')).toBeInTheDocument();
});