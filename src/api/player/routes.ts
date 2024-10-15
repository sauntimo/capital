import { Router } from "@oak/oak";

import { playerService } from "./player.service.ts"

const playerRouter = new Router({ prefix: "/player" });

playerRouter.get("/", (context) => {
  const player = playerService.getPlayer();

  context.response.body = player;
});

export { playerRouter };