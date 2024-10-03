import { create } from 'zustand';

const usePlaylistStore = create((set) => ({
  playlists: [],
  selectedPlaylist: [],
  selectedPlaylistId: '2xAsP2K8vZzPK4K5hmssy3',

  setPlaylists: (playlists) => set({ playlists }),
  setSelectedPlaylist: (selectedPlaylist) => set({ selectedPlaylist }),
}));

export default usePlaylistStore;
