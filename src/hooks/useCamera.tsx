import { create } from "zustand";

interface Camera {
  hasCamera: boolean;
  getCamera: () => Promise<void>;
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
    } catch {
      set({ hasCamera: false });
    }
  },
}));
