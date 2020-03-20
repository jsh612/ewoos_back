import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import { LoginMutationArgs, LoginResponse } from "../../../types/graph";
import { generateToken } from "../../../utils";
import { checkPassword } from "../../../utils/etcUtils";

const resolvers: IResolvers = {
  Mutation: {
    Login: async (_, args: LoginMutationArgs): Promise<LoginResponse> => {
      const { userId, password } = args;
      try {
        const thisUser = await prisma.user({ userId });
        if (!thisUser) {
          return {
            ok: false,
            error: "해당 아이디의 계정이 없습니다.",
            token: null,
            username: null
          };
        } else {
          const boolPW = await checkPassword(password, thisUser.password);
          if (boolPW) {
            const token = generateToken(thisUser.id);
            return {
              ok: true,
              error: null,
              token,
              username: thisUser.username
            };
          } else {
            return {
              ok: false,
              error: "비밀번호가 일치하지 않습니다.",
              token: null,
              username: null
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error,
          token: null,
          username: null
        };
      }
    }
  }
};

export default resolvers;
