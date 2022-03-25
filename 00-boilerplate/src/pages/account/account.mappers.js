export const mapAccountVmToApi = account => ({
  ...account,
  name: account.alias,
});
