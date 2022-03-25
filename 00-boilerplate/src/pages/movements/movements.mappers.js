export const mapMovementListApiToVm = movementList =>
  Array.isArray(movementList)
    ? movementList.map(movement => mapMovementApiToVm(movement))
    : [];

const mapMovementApiToVm = movement => ({
  id: movement.id,
  description: movement.description,
  amount: `${movement.amount} €`,
  balance: `${movement.balance} €`,
  transaction: new Date(movement.transaction).toLocaleDateString(),
  realTransaction: new Date(movement.realTransaction).toLocaleDateString(),
});
