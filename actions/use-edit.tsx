import { create } from "zustand";

export type Project = {
  id: number;
  owner: string;
  name: string;
  description: string;
  members: string[];
};

type EditStore = {
  isOpen: boolean;
  project: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
};

export const useEdit = create<EditStore>((set) => ({
  isOpen: false,
  project: null,
  onOpen: (project: Project) => set({ isOpen: true, project }),
  onClose: () => set({ isOpen: false }),
}));
