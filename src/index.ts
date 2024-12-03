import express, { Express, Request, Response, NextFunction } from "express";
import dataSource from "./config/typeorm.config";
import { pino } from "pino";
import { seedData } from "./config/seeder";
import authRouter from "./api/auth/auth.router";
import userRouter from "./api/user/user.router";
import projectRouter from "./api/project/project.router";
import boardRouter from "./api/board/board.router";
import listRouter from "./api/list/list.router";
import cardRouter from "./api/card/card.router";
import commentRouter from "./api/comment/comment.router";

const app: Express = express();
const port = 3000;
app.use(express.json());

const logger = pino({ name: "server start" });

async function startApp() {
  try {
    await dataSource.initialize();
    logger.info("Data Source has been initialized!");

    await seedData(dataSource);
  } catch (error) {
    const errorMessage = `Error during Data Source initialization:, ${
      (error as Error).message
    }`;
    logger.error(errorMessage);
  }
}
startApp();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/card", cardRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
