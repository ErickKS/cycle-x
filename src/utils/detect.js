import * as tf from "@tensorflow/tfjs";
import labels from "./labels.json";

const numClass = labels.length;

/**
 * Preprocess image / frame before forwarded into the model
 * @param {HTMLVideoElement|HTMLImageElement} source
 * @param {Number} modelWidth
 * @param {Number} modelHeight
 * @returns input tensor
 */
const preprocess = (source, modelWidth, modelHeight) => {
  const input = tf.tidy(() => {
    const img = tf.browser.fromPixels(source);

    const [h, w] = img.shape.slice(0, 2);
    const maxSize = Math.max(w, h);
    const imgPadded = img.pad([
      [0, maxSize - h],
      [0, maxSize - w],
      [0, 0],
    ]);

    return tf.image.resizeBilinear(imgPadded, [modelWidth, modelHeight]).div(255.0).expandDims(0);
  });

  return input;
};

/**
 * Function run inference and do detection from source.
 * @param {HTMLImageElement|HTMLVideoElement} source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {VoidFunction} callback function to run after detection process
 */
export const detect = async (source, model, callback = () => {}) => {
  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3);

  tf.engine().startScope();
  const input = preprocess(source, modelWidth, modelHeight);

  const res = model.net.execute(input);
  const transRes = res.transpose([0, 2, 1]);
  const boxes = tf.tidy(() => {
    const w = transRes.slice([0, 0, 2], [-1, -1, 1]);
    const h = transRes.slice([0, 0, 3], [-1, -1, 1]);
    const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2));
    const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2));
    return tf.concat([y1, x1, tf.add(y1, h), tf.add(x1, w)], 2).squeeze();
  });

  const [scores, classes] = tf.tidy(() => {
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0);
    return [rawScores.max(1), rawScores.argMax(1)];
  });

  const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2);

  const scores_data = scores.gather(nms, 0).dataSync();
  const classes_data = classes.gather(nms, 0).dataSync();

  const results = [];

  for (let i = 0; i < scores_data.length; ++i) {
    if (scores_data[i] > 0.7) {
      const klass = labels[classes_data[i]];
      const score = (scores_data[i] * 100).toFixed(1);

      const result = { klass, score };
      results.push(result);
    }
  }

  tf.dispose([res, transRes, boxes, scores, classes, nms]);

  callback();

  tf.engine().endScope();

  return results;
};
