import { create } from 'zustand';
import { fetchContent, saveContent } from '../lib/firebase';

interface AdminState {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  content: any;
  loading: boolean;
  loadContent: () => Promise<void>;
  updateContent: (newData: any) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  login: () => {
    localStorage.setItem('isAdmin', 'true');
    set({ isAdmin: true });
  },
  logout: () => {
    localStorage.removeItem('isAdmin');
    set({ isAdmin: false });
  },
  content: null,
  loading: true,
  loadContent: async () => {
    set({ loading: true });
    const data = await fetchContent();
    set({ content: data, loading: false });
  },
  updateContent: async (newData) => {
    const success = await saveContent(newData);
    if (success) {
      set({ content: newData });
    }
  }
}));
