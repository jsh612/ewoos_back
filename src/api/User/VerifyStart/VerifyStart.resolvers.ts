import { IResolvers } from "graphql-tools";
import { prisma, Verification } from "../../../../generated/prisma-client";
import {
  VerifyStartMutationArgs,
  VerifyStartResponse
} from "../../../types/graph";
import { randomIntGen } from "../../../utils/etcUtils";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: IResolvers = {
  Mutation: {
    VerifyStart: async (
      _,
      args: VerifyStartMutationArgs
    ): Promise<VerifyStartResponse> => {
      const { phoneNumber } = args;
      try {
        const existsVerification = await prisma.verifications({
          where: { phoneNumber }
        });
        if (existsVerification[0]) {
          await prisma.deleteVerification({ id: existsVerification[0].id });
        }
        const secretKey = randomIntGen();
        const newVerification: Verification = await prisma.createVerification({
          phoneNumber,
          secretKey,
          verified: false
        });
        await sendVerificationSMS(
          newVerification.phoneNumber,
          newVerification.secretKey
        );
        // 시간타이머 작성 (인증 3분 후 자동 삭제)
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
