import bcrypt from "bcrypt";
import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import { SignUpMutationArgs, SignUpResponse } from "../../../types/graph";

const resolvers: IResolvers = {
  Mutation: {
    SignUp: async (_, args: SignUpMutationArgs): Promise<SignUpResponse> => {
      const { userId, username, password, info, email, phoneNumber } = args;
      const enPassword = await bcrypt.hash(password, 10);
      const existName = await prisma.$exists.user({ username }); // 유저네임 중복 검사
      const existId = await prisma.$exists.user({ userId });
      if (existName) {
        return {
          ok: false,
          error: "해당 넥네임이 이미 존재합니다."
        };
      }
      if (existId) {
        return {
          ok: false,
          error: "해당 아이디가 이미 존재합니다."
        };
      }
      const phoneVerification = await prisma.verifications({
        where: {
          AND: [{ payload: phoneNumber }, { verified: true }]
        }
      });
      if (phoneVerification) {
        await prisma.createUser({
          userId,
          username,
          password: enPassword,
          info: info || "",
          phoneNumber,
          verifiedPhoneNumber: phoneVerification[0].verified
        });
        return {
          ok: true,
          error: null
        };
      } else {
        return {
          ok: false,
          error: "해당 휴대전화 번호는 인증되지 않은 번호입니다."
        };
      }
    }
  }
};

export default resolvers;
