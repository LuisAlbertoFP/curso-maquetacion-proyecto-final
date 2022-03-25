export const mapAccountApiToVm = account => ({
  ...account,
  alias: account.name,
  balance: `${account.balance} €`,
});
