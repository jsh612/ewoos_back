import { IResolvers } from "graphql-tools";
import { prisma } from "./../../../../generated/prisma-client/index";
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
        const existingRent = await prisma.rents({
          where: {
            post: {
              id: postId
            }
          }
        });
        if (existingRent.length !== 0) {
          return {
            ok: false,
            error: "이미 대여중 입니다."
          };
        }
        await prisma.createRent({
          post: {
            connect: { id: postId }
          },
          user: {
            connect: { id: user.id }
          },
          message,
          status: "REQUEST"
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
