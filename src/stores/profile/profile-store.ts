import { createStore } from 'zustand/vanilla';
import { User } from '@ahomevilla-hotel/node-sdk';

export type ProfileState = {
  profile: User | null;
};

export type ProfileActions = {
  setProfile: (user: User | null) => void;
};

export type ProfileStore = ProfileState & ProfileActions;

export const createProfileStore = (initState: ProfileState = { profile: null }) => {
  return createStore<ProfileStore>()((set) => ({
    ...initState,
    setProfile: (user) => set({ profile: user }),
  }));
};
