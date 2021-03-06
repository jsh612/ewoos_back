import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/./../.env" });

import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import { isAuthenticated } from "./middlewares";
import { authenticateJwt } from "./passport";

import schema from "./schema";
import { uploadController, uploadMiddleware } from "./upload";

const PORT = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(cors());
server.express.use(helmet());
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start(
  {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
    // playground 옵션 : false일 경우 playground 접속 불가 (최종 배포시 설정하면 좋을 듯)
    // 배포시 prisma.yml의 secret도 같이 하면 될듯
    // playground: false
  },
  () =>
    console.log(`GraphQL서버  http://localhost:${PORT}${PLAYGROUND_ENDPOINT}`)
);
