"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { useValidate } from "@/hooks/useValidate";
import { useRegister } from "@/hooks/useRegister";
import { Address, User } from "@/contexts/RegisterContext";

import { Banner } from "@/components/layout/banner";
import { Actions } from "@/components/layout/actions";
import { Input } from "@/components/form/input";
import { DialogAddress } from "@/components/radix/dialog";

import { inputDadosLabels, inputAddressLabels } from "@/constants/inputsTypes";

export default function Dados() {
  const { user, updateUserData, address, updateAddressData } = useRegister();
  const router = useRouter();

  // ========== VALIDATIONS
  const validationUser = useValidate<User>({
    initialValues: user,
    validate: (values) => {
      const errors: { [key: string]: string } = {
        name: "",
        email: "",
        tel: "",
        cpf: "",
      };

      if (!values.name) {
        errors.name = "Campo obrigatório";
      } else if (!/^[A-Za-zÀ-ú'-]+( [A-Za-zÀ-ú'-]+ ?)+$/i.test(values.name)) {
        errors.name = "Por favor, insira um nome válido";
      }

      if (!values.email) {
        errors.email = "Campo obrigatório";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Por favor, insira um email válido";
      }

      if (!values.tel) {
        errors.tel = "Campo obrigatório";
      } else if (!/\(\d{2}\) \d{5}-\d{4}$/i.test(values.tel)) {
        errors.tel = "Por favor, insira um telefone válido";
      }

      if (!values.cpf) {
        errors.cpf = "Campo obrigatório";
      } else if (
        !/^(?:(?!000\.000\.000-00|111\.111\.111-11|222\.222\.222-22|333\.333\.333-33|444\.444\.444-44|555\.555\.555-55|666\.666\.666-66|777\.777\.777-77|888\.888\.888-88|999\.999\.999-99)[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/i.test(
          values.cpf
        )
      ) {
        // NÃO ESQUECER DE VALIDAR A MATEMÁTICA
        errors.cpf = "Por favor, insira um cpf válido";
      }

      return errors;
    },
  });

  const validationAddress = useValidate<Address>({
    initialValues: address,
    validate: (values) => {
      const errors: { [key: string]: string } = {
        cep: "",
        number: "",
        comp: "",
      };

      if (!values.cep) {
        errors.cep = "Campo obrigatório";
      } else if (!/^\d{5}-?\d{3}$/i.test(values.cep)) {
        errors.cep = "Por favor, insira um CEP válido";
      }

      if (!values.number) {
        errors.number = "Campo obrigatório";
      } else if (+values.number <= 0) {
        errors.number = "Insira um número válido";
      }

      return errors;
    },
  });

  const isValidUser = Object.values(validationUser.errors).every((error) => !error);
  const isValidAddress = Object.values(validationAddress.errors).every((error) => !error);

  // ========== ADDRESS
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | null>(null);
  const [addressAlert, setAddressAlert] = useState(false);
  const [submittedClientAddress, setSubmittedClientAddress] = useState(false);

  function openAddressDialog(item: Address | null) {
    item ? setDialogType("edit") : setDialogType("add");
    setOpenDialog(true);
  }

  function handleClientAddress() {
    if (isValidAddress) {
      const newUserAddress = validationAddress.values as Address;
      updateAddressData(newUserAddress);

      setSubmittedClientAddress(true);
      setOpenDialog(false);
    } else {
      validationAddress.handleSubmit();
    }
  }

  // ========== SUBMIT STEP
  function handleClientDocs() {
    if (!isValidUser) validationUser.handleSubmit();
    if (!isValidAddress || !submittedClientAddress) setAddressAlert(!addressAlert);

    if (isValidUser && isValidAddress && submittedClientAddress) {
      const newUserData = validationUser.values as User;
      updateUserData(newUserData);

      router.push("/registro");
    }
  }

  return (
    <>
      <Banner
        title="Formulário de cadastro"
        description="Preencha o formulário a seguir com seus dados pessoais."
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {inputDadosLabels.map((input) => {
            const field = input.id as keyof User;

            return validationUser.values[field] !== undefined ? (
              <Input
                type={input.type}
                id={input.id}
                name={input.id}
                key={input.id}
                label={input.label}
                value={validationUser.values[field]}
                onChange={validationUser.handleChange}
                error={validationUser.touched[field] && validationUser.errors[field]}
                mask={input.id === "tel" ? "(99) 99999-9999" : input.id === "cpf" ? "999.999.999-99" : ""}
                required
              />
            ) : null;
          })}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">Endereço</h2>

          {submittedClientAddress || address.cep !== "" ? (
            <div className="group flex w-full items-center justify-between rounded border-2 border-gray-light px-3 py-3 text-lg outline-none transition focus-within:bg-primary-light">
              <span>Meu endereço</span>
              <button
                className="rounded bg-primary px-4 py-1 text-base text-white outline-none hover:bg-primary-dark focus:bg-primary-dark"
                onClick={() => openAddressDialog(address)}
              >
                Editar
              </button>
            </div>
          ) : (
            <button
              className={`
                flex w-full items-center justify-between rounded border-2 p-3 text-left text-lg outline-none transition hover:bg-primary-light focus:bg-primary-light
                ${addressAlert ? "border-red" : "border-gray-light"}
              `}
              onClick={() => openAddressDialog(null)}
            >
              Adicionar Endereço
              <Plus />
            </button>
          )}

          <DialogAddress open={openDialog} setOpen={setOpenDialog} type={dialogType} title="endereço" onSubmit={handleClientAddress}>
            {inputAddressLabels.map((input) => {
              const field = input.id as keyof Address;

              return validationAddress.values[field] !== undefined ? (
                <Input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  key={input.id}
                  label={input.label}
                  value={validationAddress.values[field]}
                  onChange={validationAddress.handleChange}
                  error={validationAddress.touched[field] && validationAddress.errors[field]}
                  mask={input.id === "cep" ? "99999-999" : ""}
                  required={input.id !== "comp"}
                />
              ) : null;
            })}
          </DialogAddress>
        </div>
      </div>

      <div className="grid gap-4 xs:grid-cols-2">
        <Actions onStepCompletion={handleClientDocs} />
      </div>
    </>
  );
}
