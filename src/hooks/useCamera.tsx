import { create } from "zustand";

interface Camera {
  hasCamera: boolean;
  getCamera: () => Promise<boolean>;
}

export const useCamera = create<Camera>((set) => ({
  hasCamera: false,

  getCamera: async () => {
    try {
      const mediaCamera = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      mediaCamera.getTracks().forEach((track) => track.stop());
      set({ hasCamera: true });

      return true;
    } catch {
      set({ hasCamera: false });

      return false;
    }
  },
}));
