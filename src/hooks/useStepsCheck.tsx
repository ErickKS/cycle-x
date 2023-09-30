import { useRegister } from "./useRegister";

export function useStepsCheck() {
  const { user, address, bike, plan, photos } = useRegister();

  const isValidUser = Object.values(user).every((value) => !!value);
  const isValidAddress = Object.keys(address).filter((value) => value !== "comp").every((value) => !!value);
  const isValidBike = Object.values(bike).every((value) => !!value);
  const isValidPlan = Object.values(plan).every((value) => !!value);
  const isValidPhotos = Object.values(photos).every((photo) => photo.status === "valid");

  const userStep = isValidUser && isValidAddress;
  const bikeStep = isValidBike;
  const planStep = isValidPlan;
  const photosStep = isValidPhotos;

  const isValid = userStep && bikeStep && planStep && photosStep

  return {
    userStep,
    bikeStep,
    planStep,
    photosStep,
    isValid
  };
}
