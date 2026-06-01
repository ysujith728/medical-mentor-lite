import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// This will be set by App.jsx after QueryClient is created
let _queryClient = null;
export const setQueryClient = (qc) => { _queryClient = qc; };

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, user: session?.user || null, loading: false });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user || null });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    // Clear all cached query data to prevent data bleed between sessions
    if (_queryClient) {
      _queryClient.clear();
    }
    set({ user: null, session: null });
  }
}));

export default useAuthStore;

