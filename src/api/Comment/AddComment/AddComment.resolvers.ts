import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  CreateCommentMutationArgs,
  CreateCommentResponse
} from "../../../types/graph";

const resolvers: IResolvers = {
  Mutation: {
    CreateComment: async (
      _,
      args: CreateCommentMutationArgs,
      { request, isAuthenticated }
    ): Promise<CreateCommentResponse> => {
      isAuthenticated(request);
      const { user } = request;
      const { text, postId } = args;
      try {
        await prisma.createComment({
          user: {
            connect: { id: user.id }
          },
          post: {
            connect: { id: postId }
          },
          text
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
