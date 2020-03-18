import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/./../.env" });

import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import { isAuthenticated } from "./middlewares";
import { authenticateJwt } from "./passport";

import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(cors());
server.express.use(helmet());
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start(
  {
    port: PORT
    // playground 옵션 : false일 경우 playground 접속 불가 (최종 배포시 설정하면 좋을 듯)
    // 배포시 prisma.yml의 secret도 같이 하면 될듯
    // playground: false
  },
  () => console.log(`GraphQL서버  http://localhost:${PORT}`)
);
