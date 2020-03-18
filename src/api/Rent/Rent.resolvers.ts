import { prisma } from "../../../generated/prisma-client";

export default {
  Rent: {
    post: ({ id }) => prisma.rent({ id }).post(),
    user: ({ id }) => prisma.rent({ id }).user()
  }
};
