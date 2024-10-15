// miner.service.ts

/**
 * A mock in-memory database for storing miners.
 * Each miner has an ID, status, and configuration.
 */
const miners = new Map<number, { id: number, status: string, config: Record<string, any> }>([
  [1, { id: 1, status: 'idle', config: { power: 100, speed: 5 } }],
  [2, { id: 2, status: 'mining', config: { power: 200, speed: 10 } }],
]);

/**
 * Get the current status of a miner by its ID.
 *
 * @param {number} minerId - The ID of the miner.
 * @returns {string} The current status of the miner.
 * @throws {Error} If the miner with the given ID is not found.
 *
 * @example
 * // Get the status of miner with ID 1
 * const status = getMinerStatus(1);
 * console.log(status); // Output: 'idle'
 */
export const getMinerStatus = (minerId: number): string => {
  const miner = miners.get(minerId);
  if (!miner) {
    throw new Error(`Miner with ID ${minerId} not found`);
  }
  return miner.status;
};

/**
 * Update the configuration of a miner.
 *
 * @param {number} minerId - The ID of the miner.
 * @param {Record<string, any>} config - The configuration to update.
 * @returns {Record<string, any>} The updated configuration of the miner.
 * @throws {Error} If the miner with the given ID is not found.
 *
 * @example
 * // Update the power and speed of miner with ID 1
 * const updatedConfig = updateMinerConfig(1, { power: 150, speed: 7 });
 * console.log(updatedConfig); // Output: { power: 150, speed: 7 }
 */
export const updateMinerConfig = (minerId: number, config: Record<string, any>): Record<string, any> => {
  const miner = miners.get(minerId);
  if (!miner) {
    throw new Error(`Miner with ID ${minerId} not found`);
  }
  miner.config = { ...miner.config, ...config };
  return miner.config;
};

/**
 * Start a mining task for a miner by its ID.
 *
 * @param {number} minerId - The ID of the miner.
 * @returns {string} A message indicating the mining task has started.
 * @throws {Error} If the miner with the given ID is not found or is already mining.
 *
 * @example
 * // Start a mining task for miner with ID 1
 * const message = startMiningTask(1);
 * console.log(message); // Output: 'Miner 1 started mining'
 */
export const startMiningTask = (minerId: number): string => {
  const miner = miners.get(minerId);
  if (!miner) {
    throw new Error(`Miner with ID ${minerId} not found`);
  }
  if (miner.status === 'mining') {
    throw new Error(`Miner with ID ${minerId} is already mining`);
  }
  miner.status = 'mining';
  return `Miner ${minerId} started mining`;
};
