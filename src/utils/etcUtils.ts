import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomInt from "random-int";

// 인증 절차시 사용할 시크릿키 생성
export const randomIntGen = () => String(randomInt(100000, 999999));

// 로그인시 비밀번호 확인
export const checkPassword = (inputPW: string, dbPW: string) =>
  bcrypt.compare(inputPW, dbPW);

// token 생성
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
};
