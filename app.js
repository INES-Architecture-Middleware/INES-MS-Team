import express from "express";
import http from "http";
import { mongoConnection } from './utils/mongoConnection.js';
import {TeamRouter} from "./routers/TeamRouter.js";
import {TeamController} from "./controllers/TeamController.js";
import cors from "cors"
import dotenv from "dotenv"

(async () => {
    dotenv.config()

    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: [process.env.CLIENT_URL],
        credentials: true,
    }))

    let bddConnected;
    while (!bddConnected) {
      try {
        await mongoConnection();
        bddConnected = true;
      } catch (err) {
        console.log('BDD CONNECTION ERROR : ', err);
        bddConnected = false;
      }
    }

    const teamController = new TeamController();
    app.use("/team", new TeamRouter(teamController).router);

    const PORT = process.env.PORT;
    const server = http.createServer(app);
    server.setTimeout(24 * 3600 * 1000);
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log('Server listening on PORT', PORT);
    });
  })();