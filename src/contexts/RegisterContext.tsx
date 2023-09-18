"use client";

import { ReactNode, createContext, useState } from "react";

export interface User {
  name: string;
  email: string;
  tel: string;
  cpf: string;
}
export interface Address {
  cep: string;
  address: string;
  number: number | string;
  neighborhood: string;
  city: string;
  uf: string;
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
  name: string;
  size: number | string;
  type: string;
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
  updatePhotosData: (photosData: Photos) => void;
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
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    uf: "",
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
      name: "",
      size: "",
      type: "",
    },
    left: {
      name: "",
      size: "",
      type: "",
    },
    chassi: {
      name: "",
      size: "",
      type: "",
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

  function updatePhotosData(photosData: Photos) {
    setPhotos(photosData);
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
        updateUserData,
        updateAddressData,
        updateBikeData,
        updateOrAddAccessoryData,
        deleteAccessoryData,
        setSelectedAccessory,
        selectedAccessory,
        updatePlanData,
        updatePhotosData,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
