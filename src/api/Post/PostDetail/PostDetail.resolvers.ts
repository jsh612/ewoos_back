import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  Post,
  PostDetailQueryArgs,
  PostDetailResponse
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Query: {
    PostDetail: async (
      _,
      args: PostDetailQueryArgs,
      { request, isAuthenticated }
    ): Promise<PostDetailResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        const itPost = await prisma.post({ id: postId });
        if (itPost) {
          return {
            ok: true,
            error: null,
            post: itPost as Post
          };
        }
        return {
          ok: false,
          error: "해당 게시물이 존재하지 않습니다.",
          post: null
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
