const getPlayer = () => {
  const player = {
    id: 1,
    credit_balance: 1000,
    location_id: 1,
    stored_resources: {},
    equipment: { miners: [], ships: [] }
  };

  return player;
}

export const playerService = { getPlayer }