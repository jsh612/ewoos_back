import jwt from "jsonwebtoken";

// token 생성 함수
export const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!);
