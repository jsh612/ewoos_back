import bcrypt from "bcrypt";
import { IResolvers } from "graphql-tools";
import { checkPassword } from "../../../utils/etcUtils";
import { prisma, User } from "./../../../../generated/prisma-client/index";
import {
  ChangePwMutationArgs,
  ChangePWResponse
} from "./../../../types/graph.d";

const resolvers: IResolvers = {
  Mutation: {
    ChangePW: async (
      _,
      args: ChangePwMutationArgs,
      { request, isAuthenticated }
    ): Promise<ChangePWResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      const { oldPW, newPW } = args;
      const oldPWChecker = await checkPassword(oldPW, user.password);
      const enPassword = await bcrypt.hash(newPW, 10);
      try {
        if (oldPWChecker) {
          await prisma.updateUser({
            data: {
              password: enPassword
            },
            where: {
              id: user.id
            }
          });
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "기존 비밀번호가 일치하지 않습니다."
          };
        }
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
