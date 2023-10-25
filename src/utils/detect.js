import { Tensor } from "onnxruntime-web";
import { getImageTensorFromPath } from "./imageHelper";

/**
 * Detect Image
 * @param {HTMLImageElement} image Image to detect
 * @param {ort.InferenceSession} session YOLOv8 onnxruntime session
 */
export const detectImage = async (image, session) => {
  const MODEL_SHAPES = [1, 3, 256, 256];
  const IOU_THRESHOLD = 0.45;
  const SCORE_THRESHOLDeThreshold = 0.7;

  const [modelWidth, modelHeight] = MODEL_SHAPES.slice(2);
  const input = await getImageTensorFromPath(image, modelWidth, modelHeight);

  const tensor = new Tensor("float32", input.data, MODEL_SHAPES);
  const config = new Tensor("float32", new Float32Array([100, IOU_THRESHOLD, SCORE_THRESHOLDeThreshold]));

  const { output0 } = await session.net.run({ images: tensor });
  const { selected } = await session.nms.run({ detection: output0, config: config });

  const boxes = [];

  for (let idx = 0; idx < selected.dims[1]; idx++) {
    const data = selected.data.slice(idx * selected.dims[2], (idx + 1) * selected.dims[2]);
    const scores = data.slice(4); // scores
    const score = Math.max(...scores); // maximum probability scores
    const label = scores.indexOf(score); // classes

    boxes.push({ label: label, confidence: score });
  }

  return boxes;
};
