import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
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
        if (existsVerification) {
          await prisma.deleteVerification({ id: existsVerification[0].id });
        } else {
          const secretKey = randomIntGen();
          const newVerification = await prisma.createVerification({
            phoneNumber,
            secretKey,
            verified: false
          });
          await sendVerificationSMS(
            newVerification.phoneNumber,
            newVerification.secretKey
          );
          return {
            ok: true,
            error: null
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
