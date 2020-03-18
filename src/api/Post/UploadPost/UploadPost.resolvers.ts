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
      const { title, location, desc } = args;
      try {
        const newPost = await prisma.createPost({
          title,
          location,
          desc,
          user: {
            connect: { id: user.id }
          }
        });
        console.log("새로운 포스트", newPost);
        // todo
        // 이미지 업로드하여 해당 file도 post에 추가
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
