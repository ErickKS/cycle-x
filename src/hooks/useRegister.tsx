import { useContext } from "react";

import { RegisterContext } from "@/contexts/RegisterContext";

export function useRegister() {
  return useContext(RegisterContext);
}
