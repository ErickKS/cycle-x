import { create } from "zustand";

export interface User {
  name: string;
  email: string;
  tel: string;
  cpf: string;
}
const initialUser = {
  name: "",
  email: "",
  tel: "",
  cpf: "",
};

export interface Address {
  cep: string;
  number: number | string;
  comp?: string;
}
const initialAddress = {
  cep: "",
  number: "",
  comp: "",
};

export interface Bike {
  type: string;
  brand: string;
  model: string;
  chassi: string;
  price: number | string;
  usage: number | string;
}
const initialBike = {
  type: "",
  brand: "",
  model: "",
  chassi: "",
  price: "",
  usage: "",
};

export interface Accessory {
  type: string;
  brand: {
    id: string;
    value: string;
  };
  model: {
    id: string;
    value: string;
  };
  price: {
    id: string;
    value: number | string;
  };
}

export interface Plan {
  name: string;
}
const initialPlan = {
  name: "",
};

export interface Photo {
  file: File | null;
  previewURL: string;
  status: string;
}
export interface Photos {
  right: Photo;
  left: Photo;
  chassi: Photo;
}
const initialPhoto = {
  file: null,
  previewURL: "",
  status: "waiting",
};
const initialPhotos = {
  right: initialPhoto,
  left: initialPhoto,
  chassi: initialPhoto,
};

interface Form {
  user: User;
  address: Address;
  bike: Bike;
  accessory: Accessory[];
  selectedAccessory: Accessory | null;
  plan: Plan;
  photos: Photos;

  updateDataByStage: (stage: string, value: User | Address | Bike | Plan) => void;

  updateOrAddAccessoryData: (accessoryData: Accessory, isUpdate: boolean) => void;
  setSelectedAccessory: (selectedAccessory: Accessory | null) => void;
  deleteAccessory: (accessoryData: Accessory | null) => void;

  updatePhotos: (category: string, updateFunction: (prevPhoto: Photo) => Photo) => void
}

export const useFormStorage = create<Form>((set) => ({
  user: initialUser,
  address: initialAddress,
  bike: initialBike,
  accessory: [] as Accessory[],
  selectedAccessory: null,
  plan: initialPlan,
  photos: initialPhotos,

  // Action to update data based on the stage (user - bike - address - plan)
  updateDataByStage: (stage, value) =>
    set((state) => ({
      ...state,
      [stage]: value,
    })),

  // Accessory actions
  updateOrAddAccessoryData: (accessoryData: Accessory, isUpdate: boolean) =>
    set((state) => {
      const { accessory } = state;
      const index = accessory.findIndex((item) => item.model.id === accessoryData.model.id);

      if (isUpdate && index !== -1) {
        const updatedAccessoryList = [...accessory];
        updatedAccessoryList[index] = accessoryData;
        return { accessory: updatedAccessoryList, selectedAccessory: null };
      } else {
        const updatedAccessoryList = [...accessory, accessoryData];
        return { accessory: updatedAccessoryList, selectedAccessory: null };
      }
    }),
  setSelectedAccessory: (selectedAccessory: Accessory | null) =>
    set((state) => ({
      ...state,
      selectedAccessory,
    })),
  deleteAccessory: (accessoryData: Accessory | null) =>
    set((state) => {
      const { accessory } = state;
      const updatedAccessoryList = accessory.filter((item) => item.model.id !== accessoryData?.model.id);
      return { accessory: updatedAccessoryList, selectedAccessory: null };
    }),

  // Photos actions
  updatePhotos: (category: string, updateFunction: (prevPhoto: Photo) => Photo) =>
    set((state) => ({
      ...state,
      photos: {
        ...state.photos,
        [category]: updateFunction(state.photos[category as keyof Photos]),
      },
    })),
}));
