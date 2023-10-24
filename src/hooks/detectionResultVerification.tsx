interface detectionResult {
  klass: string;
  score: string;
}

export function detectionResultVerification(result: detectionResult[]) {
  const requiredClasses = new Set(["bike-left", "bike-right", "crown", "saddle", "handlebar", "wheel"]);
  const klassCount: { [klass: string]: number } = {};
  let bikeSide: string | null = null;

  result.forEach((item) => {
    if (requiredClasses.has(item.klass)) {
      if (klassCount[item.klass]) {
        klassCount[item.klass]++;
      } else {
        klassCount[item.klass] = 1;
      }
      if (item.klass === "bike-left" || item.klass === "bike-right") {
        bikeSide = item.klass;
      }
    }
  });

  if (
    (klassCount["bike-left"] || klassCount["bike-right"]) === 1 &&
    klassCount["crown"] === 1 &&
    klassCount["saddle"] === 1 &&
    klassCount["handlebar"] === 1 &&
    klassCount["wheel"] === 2
  ) {
    return { state: true, bikeSide };
  } else {
    return { state: false, bikeSide: null };
  }
}
