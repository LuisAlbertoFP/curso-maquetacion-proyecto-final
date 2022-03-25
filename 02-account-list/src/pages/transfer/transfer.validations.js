import { Validators, createFormValidation } from '@lemoncode/fonk';
import { iban } from '@lemoncode/fonk-iban-validator';

Validators.required.setErrorMessage('Requerido');

const validationSchema = {
  field: {
    accountId: [Validators.required],
    iban: [
      Validators.required,
      {
        validator: iban,
        message: 'IBAN no válido',
      },
    ],
    name: [Validators.required],
    amount: [
      Validators.required,
      {
        validator: Validators.pattern,
        customArgs: { pattern: /\d{1,}\.\d{2}$/ },
        message: 'Formato importe con 2 dígitos como máximo',
      },
    ],
    concept: [Validators.required],
    email: [
      Validators.required,
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
