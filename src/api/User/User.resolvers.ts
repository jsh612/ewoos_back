import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    rents: ({ id }) => prisma.user({ id }).rents(),
    comments: ({ id }) => prisma.user({ id }).comments()
  }
};
