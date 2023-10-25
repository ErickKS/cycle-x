interface DetectionResult {
  label: number;
  confidence: number;
}

export function detectionResultVerification(results: DetectionResult[]) {
  const requiredItems = new Set(["0", "1", "2", "3", "4", "5"]);
  const itemCount: { [item: string]: number } = {};
  let bikeSide: string | null = null;

  results.forEach((result) => {
    const labelString = result.label.toString();
    if (requiredItems.has(labelString)) {
      if (itemCount[labelString]) {
        itemCount[labelString]++;
      } else {
        itemCount[labelString] = 1;
      }
      if (labelString === "0" || labelString === "1") {
        bikeSide = labelString === "0" ? "bike-left" : "bike-right";
      }
    }
  });

  if (
    (itemCount["0"] || itemCount["1"]) === 1 && // At least 1 of 'bike-left' or 'bike-right'
    itemCount["2"] === 1 && // 1 'crown'
    itemCount["3"] === 1 && // 1 'handlebar'
    itemCount["4"] === 1 && // 1 'saddle'
    itemCount["5"] === 2 // 2 'wheel'
  ) {
    return { state: true, bikeSide };
  } else {
    return { state: false, bikeSide: null };
  }
}
