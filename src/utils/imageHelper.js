import Jimp from "jimp";
import { Tensor } from "onnxruntime-web";

export async function getImageTensorFromPath(path) {
  const image = await loadImageFromPath(path.src);

  const imageTensor = imageDataToTensor(image);

  return imageTensor;
}

async function loadImageFromPath(path) {
  const imageData = await Jimp.read(path).then((imageBuffer) => {
    return imageBuffer.resize(256, 256);
  });

  return imageData;
}

function imageDataToTensor(image, dims) {
  const imageBufferData = image.bitmap.data;
  const [redArray, greenArray, blueArray] = new Array(new Array(), new Array(), new Array());

  for (let i = 0; i < imageBufferData.length; i += 4) {
    redArray.push(imageBufferData[i]);
    greenArray.push(imageBufferData[i + 1]);
    blueArray.push(imageBufferData[i + 2]);
  }

  const transposedData = redArray.concat(greenArray).concat(blueArray);

  let i,
    l = transposedData.length;

  const float32Data = new Float32Array(3 * 256 * 256); // 256x256 -> image size

  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i] / 255.0;
  }

  const inputTensor = new Tensor("float32", float32Data, dims);

  return inputTensor;
}
