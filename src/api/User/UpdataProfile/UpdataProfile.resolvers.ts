import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  UpdateProfileMutationArgs,
  UpdateProfileResponse
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Mutation: {
    UpdateProfile: async (
      _,
      args: UpdateProfileMutationArgs,
      { request, isAuthenticated }
    ): Promise<UpdateProfileResponse> => {
      isAuthenticated(request);
      const { user } = request;
      const { username, info } = args;
      try {
        await prisma.updateUser({
          data: {
            username,
            info
          },
          where: {
            id: user.id
          }
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
