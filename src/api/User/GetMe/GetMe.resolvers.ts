import { IResolvers } from "graphql-tools";
import { GetMeResponse } from "../../../types/graph";

const resolvers: IResolvers = {
  Query: {
    GetMe: (_, __, { request, isAuthenticated }): GetMeResponse => {
      isAuthenticated(request);
      const { user } = request;
      return {
        ok: true,
        error: null,
        user
      };
    }
  }
};

export default resolvers;
