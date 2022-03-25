import { getMovements } from './movements.api';
import { addMovementRows } from './movements.helpers';
import { mapMovementListApiToVm } from './movements.mappers';
import { history } from '../../core/router';
import { onSetValues } from '../../common/helpers';
import { getAccount } from '../../common-app/api/account.api';
import { mapAccountApiToVm } from '../../common-app/mappers/account.mappers';

const params = history.getParams();
const accountId = params.id || 0;

getMovements(accountId).then(movements => {
  const vmMovements = mapMovementListApiToVm(movements);
  addMovementRows(vmMovements);
});

getAccount(accountId).then(apiAccount => {
  const account = mapAccountApiToVm(apiAccount);
  onSetValues(account);
});
