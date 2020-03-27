import { IResolvers } from "graphql-tools";
import { prisma } from "./../../../../generated/prisma-client/index";
import {
  CategoryPostQueryArgs,
  CategoryPostResponse,
  Post
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Query: {
    CategoryPost: async (
      _,
      args: CategoryPostQueryArgs
    ): Promise<CategoryPostResponse> => {
      const { category, pageNumber, items } = args;
      try {
        if (category) {
          const posts = await prisma.posts({
            first: items,
            skip: pageNumber,
            where: {
              category
            },
            orderBy: "createdAt_ASC"
          });
          if (posts.length !== 0) {
            return {
              ok: true,
              error: null,
              posts: posts as Post[]
            };
          } else {
            return {
              ok: false,
              error: "해당 카테고리의 상품이 없습니다.",
              posts: null
            };
          }
        } else {
          const posts = await prisma.posts({
            first: items,
            skip: pageNumber
          });
          return {
            ok: true,
            error: null,
            posts: posts as Post[]
          };
        }
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
