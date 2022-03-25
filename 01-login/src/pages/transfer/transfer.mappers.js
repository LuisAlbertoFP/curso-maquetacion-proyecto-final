export const mapAccountListApiToVm = accountList =>
  Array.isArray(accountList) ? accountList.map(mapAccountApiToVm) : [];

const mapAccountApiToVm = account => ({
  id: account.id,
  name: account.name,
});
