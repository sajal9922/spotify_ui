// store.js
import { create } from 'zustand';

const useAccessTokenStore = create((set) => ({
  accessToken: null,
  expiresIn: null,
  loading: false,
  error: null,
  state: null,
  tokenType: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setExpiresIn: (expiresIn) => set({ expiresIn }),
  setState: (state) => set({ state }),
  setTokenType: (tokenType) => set({ tokenType }),
}));

export default useAccessTokenStore;
