import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema
});

server.express.use(cors());
server.express.use(helmet());
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`GraphQL서버  http://localhost:${PORT}`)
);
