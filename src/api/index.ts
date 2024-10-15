import { Application, Router, isHttpError } from "@oak/oak";

import { playerRouter } from "./player/routes.ts";
import { minerRouter } from "./equipment/miner/miner.routes.ts";

const baseRouter = new Router();

const app = new Application();


app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    let message = "An unhandled error occurred";
    if (err instanceof Error) {
      message = err.message;
    }

    if (isHttpError(err)) {
      context.response.status = err.status;
    } else {
      context.response.status = 500;
    }
    context.response.body = { message };
    context.response.type = "json";
  }
});

app.use(playerRouter.routes());
app.use(minerRouter.routes());
// app.use(baseRouter.allowedMethods());

app.listen({ port: 8080 });
