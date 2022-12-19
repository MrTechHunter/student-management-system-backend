import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const cors = require("cors");
dotenv.config();

const app: Express = express();

var corsOptions = {
  origin: "*",
  // origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
const port = process.env.PORT;

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/student.routes")(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello dear, I'm here :)");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
