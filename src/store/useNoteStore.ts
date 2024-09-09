import create from 'zustand';
import { Note } from '@/types/Note';

interface NoteState {
  notes: Note[];
  curNote: string;
  setNotes: (data: Note[]) => void;
  setCurNote: (note: string) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  curNote: "liveblocks:examples:note-default",
  setNotes: (data) => data && set({ notes: data }),
  setCurNote: (note) => set({ curNote: note }),
}));
