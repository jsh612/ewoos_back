import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  UploadPostMutationArgs,
  UploadPostResponse
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Mutation: {
    UploadPost: async (
      _,
      args: UploadPostMutationArgs,
      { request, isAuthenticated }
    ): Promise<UploadPostResponse> => {
      isAuthenticated(request);
      const { user } = request;
      const { title, location, desc, category, files } = args;
      try {
        const newPost: any = await prisma.createPost({
          title,
          location,
          desc,
          category,
          user: {
            connect: { id: user.id }
          }
        });
        files.forEach(
          async file =>
            await prisma.createFile({
              url: file,
              post: { connect: { id: newPost.id } }
            })
        );
        return {
          ok: true,
          error: null,
          post: newPost
        };
      } catch (error) {
        return {
          ok: false,
          error,
          post: null
        };
      }
    }
  }
};

export default resolvers;
