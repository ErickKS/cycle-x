"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface User {
  name: string;
  email: string;
  tel: string;
  cpf: string;
}
export interface Address {
  cep: string;
  number: number | string;
  comp?: string;
}

export interface Bike {
  brand: string;
  model: string;
  year: number | string;
  chassi: string;
  price: number | string;
}

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

interface RegisterContextData {
  user: User;
  address: Address;
  bike: Bike;
  accessory: Accessory[];
  plan: Plan;
  photos: Photos;
  updateUserData: (userData: User) => void;
  updateAddressData: (addressData: Address) => void;
  updateBikeData: (bikeData: Bike) => void;
  selectedAccessory: Accessory | null;
  updateOrAddAccessoryData: (
    accessoryData: Accessory,
    isUpdate?: boolean,
  ) => void;
  deleteAccessoryData: (accessoryData: Accessory | null) => void;
  setSelectedAccessory: (accessory: Accessory | null) => void;
  updatePlanData: (planData: Plan) => void;
  setPhotos: Dispatch<SetStateAction<Photos>>;
}

interface RegisterContextProviderProps {
  children: ReactNode;
}

export const RegisterContext = createContext({} as RegisterContextData);

export function RegisterProvider({ children }: RegisterContextProviderProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    tel: "",
    cpf: "",
  });

  const [address, setAddress] = useState<Address>({
    cep: "",
    number: "",
    comp: "",
  });

  const [bike, setBike] = useState<Bike>({
    brand: "",
    model: "",
    year: "",
    chassi: "",
    price: "",
  });

  const [accessory, setAccessory] = useState<Accessory[]>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(
    null,
  );

  const [plan, setPlan] = useState<Plan>({
    name: "",
  });

  const [photos, setPhotos] = useState<Photos>({
    right: {
      file: null,
      previewURL: "",
      status: "waiting",
    },
    left: {
      file: null,
      previewURL: "",
      status: "waiting",
    },
    chassi: {
      file: null,
      previewURL: "",
      status: "waiting",
    },
  });

  function updateUserData(userData: User) {
    setUser(userData);
  }

  function updateAddressData(addressData: Address) {
    setAddress(addressData);
  }

  function updateBikeData(bikeData: Bike) {
    setBike(bikeData);
  }

  function updateOrAddAccessoryData(
    accessoryData: Accessory,
    isUpdate: boolean = false,
  ) {
    const index = accessory.findIndex(
      (item) => item.model.id === accessoryData.model.id,
    );

    if (isUpdate && index !== -1) {
      const updatedAccessoryList = [...accessory];
      updatedAccessoryList[index] = accessoryData;
      setAccessory(updatedAccessoryList);
    } else {
      const updatedAccessoryList = [...accessory, accessoryData];
      setAccessory(updatedAccessoryList);
    }

    setSelectedAccessory(null);
  }

  function deleteAccessoryData(accessoryData: Accessory | null) {
    const updatedAccessoryList = accessory.filter(
      (item) => item.model.id !== accessoryData?.model.id,
    );
    setAccessory(updatedAccessoryList);
    setSelectedAccessory(null);
  }

  function updatePlanData(planData: Plan) {
    setPlan(planData);
  }

  return (
    <RegisterContext.Provider
      value={{
        user,
        bike,
        address,
        accessory,
        plan,
        photos,
        setPhotos,
        updateUserData,
        updateAddressData,
        updateBikeData,
        updateOrAddAccessoryData,
        deleteAccessoryData,
        setSelectedAccessory,
        selectedAccessory,
        updatePlanData,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
