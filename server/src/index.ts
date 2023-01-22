import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { DataSource } from "typeorm";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";

const main = async () => {
  const AppDataSource = new DataSource({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Users],
  });

  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error: any) => console.log(error));

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.listen(3001, () => {
    console.log("server is running on 3001");
  });
};

main().catch((err: any) => {
  console.error(err);
});
