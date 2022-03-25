import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onSetValues,
} from '../../common/helpers';
import { history } from '../../core/router';
import { formValidation } from './account.validations';
import { insertAccount, updateAccount } from './account.api';
import { getAccount } from '../../common-app/api/account.api';
import { mapAccountVmToApi } from './account.mappers';
import { mapAccountApiToVm } from '../../common-app/mappers/account.mappers';

let account = {
  id: '',
  type: '',
  alias: '',
};

const params = history.getParams();
const isEditMode = Boolean(params.id);

if (isEditMode) {
  getAccount(params.id).then(apiAccount => {
    account = mapAccountApiToVm(apiAccount);
    onSetValues(account);
  });
}

onUpdateField('type', event => {
  const value = event.target.value;
  account = { ...account, type: value };

  formValidation.validateField('type', account.type).then(result => {
    onSetError('type', result);
  });
});

onUpdateField('alias', event => {
  const value = event.target.value;
  account = { ...account, alias: value };

  formValidation.validateField('alias', account.alias).then(result => {
    onSetError('alias', result);
  });
});

const onSave = () => {
  const apiAccount = mapAccountVmToApi(account);
  return isEditMode ? updateAccount(apiAccount) : insertAccount(apiAccount);
};

onSubmitForm('save-button', () => {
  formValidation.validateForm(account).then(result => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onSave().then(() => {
        history.back();
      });
    }
  });
});
