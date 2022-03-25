import { getAccountList } from '../../common-app/api/account-list.api';
import { mapAccountListApiToVm } from './transfer.mappers';
import { setAccountOptions } from './transfer.helpers';
import { history } from '../../core/router';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { formValidation } from './transfer.validations';

getAccountList().then(apiAccountList => {
  const accounts = mapAccountListApiToVm(apiAccountList);
  const params = history.getParams();
  setAccountOptions(accounts, params.id);
});

let transfer = {
  accountId: '',
  iban: '',
  name: '',
  amount: '',
  concept: '',
  notes: '',
  day: '',
  month: '',
  year: '',
  email: '',
};

const handleChangeValue = (id, event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    [id]: value,
  };

  formValidation.validateField(id, transfer[id]).then(result => {
    onSetError(id, result);
  });
};

onUpdateField('select-account', event => {
  handleChangeValue('accountId', event);
});

onUpdateField('iban', event => {
  handleChangeValue('iban', event);
});

onUpdateField('name', event => {
  handleChangeValue('name', event);
});

onUpdateField('amount', event => {
  handleChangeValue('amount', event);
});

onUpdateField('concept', event => {
  handleChangeValue('concept', event);
});

onUpdateField('notes', event => {
  handleChangeValue('notes', event);
});

onUpdateField('day', event => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    day: value,
  };
});

onUpdateField('month', event => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    month: value,
  };
});

onUpdateField('year', event => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    year: value,
  };
});

onUpdateField('email', event => {
  handleChangeValue('email', event);
});

onSubmitForm('transfer-button', () => {
  formValidation.validateForm(transfer).then(result => {
    onSetFormErrors(result);
    if (result.succeeded) {
      console.log({ transfer });
    }
  });
});
