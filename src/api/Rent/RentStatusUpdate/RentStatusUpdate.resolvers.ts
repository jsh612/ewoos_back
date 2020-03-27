import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  RentStatusResponse,
  RentStatusUpdateMutationArgs
} from "../../../types/graph";

const resolvers: IResolvers = {
  Mutation: {
    RentStatusUpdate: async (
      _,
      args: RentStatusUpdateMutationArgs,
      { request, isAuthenticated }
    ): Promise<RentStatusResponse> => {
      isAuthenticated(request);
      const { status, rentId } = args;
      try {
        if (status === "RENT") {
          await prisma.updateRent({ data: { status }, where: { id: rentId } });
        } else {
          await prisma.deleteRent({ id: rentId });
        }
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error
        };
      }
    }
  }
};

export default resolvers;
