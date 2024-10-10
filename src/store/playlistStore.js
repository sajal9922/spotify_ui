import { create } from 'zustand';

const usePlaylistStore = create((set) => ({
  playlists: [],
  selectedPlaylist: [],
  selectedPlaylistId: '2xAsP2K8vZzPK4K5hmssy3',
  currenlyPlaying: [],
  playerState: false,

  setPlaylists: (playlists) => set({ playlists }),
  setSelectedPlaylist: (selectedPlaylist) => set({ selectedPlaylist }),
  setCurrentlyPlaying: (track) => set((state) => ({ currentlyPlaying: track })),
  setPlayerState: (state) => set({ playerState: state }),
  setSelectedPlaylistId: (id) => set({ selectedPlaylistId: id }),
}));

export default usePlaylistStore;
