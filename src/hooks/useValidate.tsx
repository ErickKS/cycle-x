import { useState, useEffect, ChangeEvent } from "react";

interface useValidateProps<T> {
  initialValues: T;
  validate: (values: T) => { [key: string]: string };
}

export function useValidate<T>({
  initialValues,
  validate,
}: useValidateProps<T>) {
  const [touched, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [values, setValues] = useState<T>(initialValues);

  useEffect(() => {
    validateValues(values);
  }, [values]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit() {
    const filledValues: any = {};
    let emptyFields = false;

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (errors[key] !== "") {
          filledValues[key] = true;
          emptyFields = true;
        }
      }
    }

    if (emptyFields) {
      setTouchedFields(filledValues);
    }
  }

  function validateValues(values: T) {
    setErrors(validate(values));
  }

  return {
    values,
    errors,
    touched,
    setErrors,
    handleChange,
    handleSubmit,
  };
}
