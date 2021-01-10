import express from "express";
import morgan from "morgan";
import * as pgk from "../package.json";
import routes from "./routes/index.routes";
import {createRoles} from "./libs/initialSetup";

const app = express();

createRoles(); 

app.set("pgk", pgk);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

// app.get("/", (_, res) => {
//   res.json({
//     name: app.get("pgk").name,
//     author: app.get("pgk").author,
//     description: app.get("pgk").description,
//     version: app.get("pgk").version,
//   });
// });

export default app;
