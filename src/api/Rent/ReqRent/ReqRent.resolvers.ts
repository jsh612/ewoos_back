import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import { ReqRentMutationArgs, ReqRentResponse } from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Mutation: {
    ReqRent: async (
      _,
      args: ReqRentMutationArgs,
      { request, isAuthenticated }
    ): Promise<ReqRentResponse> => {
      isAuthenticated(request);
      const { postId, message } = args;
      const { user } = request;
      try {
        await prisma.createRent({
          post: {
            connect: { id: postId }
          },
          user: {
            connect: { id: user.id }
          },
          message,
          status: "APPLY"
        });
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
