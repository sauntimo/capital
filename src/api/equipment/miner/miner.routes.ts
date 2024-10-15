// miner.ts
import { createHttpError, Status, Router, Next } from "@oak/oak";
import { getMinerStatus, updateMinerConfig, startMiningTask } from "./miner.service.ts";

const minerRouter = new Router({ prefix: "/equipment/miner" });

// GET /equipment/miner/:miner_id - Provides current status of the miner
minerRouter.get("/:miner_id", (context) => {
  try {
    const minerId = parseInt(context.params.miner_id!);
    const status = getMinerStatus(minerId);
    context.response.body = { status };
  } catch (error) {
    if (error instanceof Error) {
      context.response.status = 404;
      context.response.body = { error: error.message };
    }
  }
});

// PATCH /equipment/miner/:miner_id - Updates the configuration of the miner
minerRouter.patch("/:miner_id", async (context) => {
  try {
    const minerId = parseInt(context.params.miner_id!);
    const body = await context.request.body;
    const updatedConfig = updateMinerConfig(minerId, body);
    context.response.body = { message: "Miner config updated", updatedConfig };
  } catch (error) {
    if (error instanceof Error) {
      context.response.status = 404;
      context.response.body = { error: error.message };
    }
  }
});

// POST /equipment/miner/:miner_id/task/mine - Begins a mining task for the miner
minerRouter.post("/:miner_id/task/mine", (context) => {
  let minerId;
  try {
    minerId = parseInt(context.params.miner_id!);
  } catch (_err) {
    throw createHttpError(Status.BadRequest, "Bad miner_id")
  }

  try {
    const message = startMiningTask(minerId);
    context.response.body = { message };
  } catch (error) {
    throw error;
  }


});

export { minerRouter }