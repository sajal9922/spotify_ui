import { create } from 'zustand';

const usePlaylistStore = create((set) => ({
  playlists: [],

  setPlaylists: (playlists) => set({ playlists }),
}));

export default usePlaylistStore;
