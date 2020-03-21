import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import {
  VerifyCompleteMutationArgs,
  VerifyCompleteResponse
} from "../../../types/graph";

const resolvers: IResolvers = {
  Mutation: {
    VerifyComplete: async (
      _,
      args: VerifyCompleteMutationArgs
    ): Promise<VerifyCompleteResponse> => {
      const { phoneNumber, secretKey } = args;
      try {
        const verifedPhone = await prisma.verifications({
          where: {
            AND: [{ phoneNumber }, { secretKey }]
          }
        });
        if (verifedPhone[0]) {
          await prisma.updateVerification({
            data: {
              verified: true,
              secretKey: "" // 인증 완료시 비밀 문자열 초기화
            },
            where: {
              id: verifedPhone[0].id
            }
          });

          return {
            ok: true,
            error: null
          };
        }
        return {
          ok: false,
          error: "인증요청을 먼저해주세요"
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
