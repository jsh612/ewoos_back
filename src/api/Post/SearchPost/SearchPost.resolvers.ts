import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  Post,
  SearchPostQueryArgs,
  SearchPostResponse
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Query: {
    SearchPost: async (
      _,
      args: SearchPostQueryArgs
    ): Promise<SearchPostResponse> => {
      const { term } = args;
      try {
        const postsArr = await prisma.posts({
          where: {
            title_contains: term
          }
        });
        if (postsArr.length === 0) {
          return {
            ok: false,
            error: "해당 검색어에 대한 상품이 없습니다.",
            posts: null
          };
        }
        return {
          ok: true,
          error: null,
          posts: postsArr as Post[]
        };
      } catch (error) {
        return {
          ok: false,
          error,
          posts: null
        };
      }
    }
  }
};

export default resolvers;
