import { create } from 'zustand';

export const useConsultStore = create(set => ({
  current: null,
  setCurrent: (c: any) => set({ current: c }),
}));
