import { create } from 'zustand';

const useUserInfoStore = create((set) => ({
  userInfo: [],
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
