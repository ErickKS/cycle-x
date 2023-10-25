import { InferenceSession, Tensor } from "onnxruntime-web";
import { downloadBuf } from "@/utils/download";
import { create } from "zustand";

interface Model {
  session: { net: InferenceSession; nms: InferenceSession } | null;
  getModel: () => void;
}

export const useModel = create<Model>((set) => ({
  session: null,

  getModel: async () => {
    const MODEL_URL = "../model/best.onnx";
    const MODEL_URL_2 = "../model/nms-yolov8.onnx";
    const MODEL_SHAPES = [1, 3, 256, 256];

    const arrBufNet = await downloadBuf(MODEL_URL);
    const yolov8 = await InferenceSession.create(arrBufNet, { executionProviders: ["wasm"] });

    const arrBufNMS = await downloadBuf(MODEL_URL_2);
    const nms = await InferenceSession.create(arrBufNMS, { executionProviders: ["wasm"] });

    const tensor = new Tensor("float32", new Float32Array(MODEL_SHAPES.reduce((a, b) => a * b)), MODEL_SHAPES);
    await yolov8.run({ images: tensor });

    set({ session: { net: yolov8, nms } });

    console.log("carregado");
  },
}));
