import { useFormStorage } from "@/hooks/useFormStorage";

export function useFormStorageChecker() {
  const { user, address, bike, plan, photos } = useFormStorage();

  function isValidStep(obj: Record<string, any>, excludeKey: string | null = null) {
    for (const key in obj) {
      if (key !== excludeKey && !obj[key]) {
        return false;
      }
    }
    return true;
  };

  const userStep = isValidStep(user) && isValidStep(address, "comp");
  const bikeStep = isValidStep(bike);
  const planStep = isValidStep(plan);
  const photosStep = Object.values(photos).every((photo) => photo.status === "valid");

  const isValid = userStep && bikeStep && planStep && photosStep;

  return {
    userStep,
    bikeStep,
    planStep,
    photosStep,
    isValid,
  };
}
