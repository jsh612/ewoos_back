export const typeDefs = ["type User {\n  id: ID!\n  userId: String!\n  username: String!\n  password: String!\n  info: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  post: [Post!]\n  rents: [Rent!]\n  comments: [Comment!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Post {\n  id: ID!\n  user: User!\n  title: String!\n  location: String!\n  desc: String!\n  files: [File!]!\n  rents: [Rent!]\n  comments: [Comment!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Rent {\n  id: ID!\n  post: Post!\n  user: User!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: ID!\n  phoneNumber: String!\n  secretKey: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  thing: String\n  GetMe: GetMeResponse\n}\n\ntype GetMeResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype LoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  Login(userId: String!, password: String!): LoginResponse!\n  SignUp(userId: String!, username: String!, password: String!, info: String, phoneNumber: String!): SignUpResponse!\n  VerifyComplete(phoneNumber: String!, secretKey: String!): VerifyCompleteResponse!\n  VerifyStart(phoneNumber: String!): VerifyStartResponse!\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype VerifyCompleteResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype VerifyStartResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  thing: string | null;
  GetMe: GetMeResponse | null;
}

export interface GetMeResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: string;
  userId: string;
  username: string;
  password: string;
  info: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  post: Array<Post>;
  rents: Array<Rent>;
  comments: Array<Comment>;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Post {
  id: string;
  user: User;
  title: string;
  location: string;
  desc: string;
  files: Array<File>;
  rents: Array<Rent>;
  comments: Array<Comment>;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface File {
  id: string;
  url: string;
  post: Post;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Rent {
  id: string;
  post: Post;
  user: User;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  post: Post;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Mutation {
  Login: LoginResponse;
  SignUp: SignUpResponse;
  VerifyComplete: VerifyCompleteResponse;
  VerifyStart: VerifyStartResponse;
}

export interface LoginMutationArgs {
  userId: string;
  password: string;
}

export interface SignUpMutationArgs {
  userId: string;
  username: string;
  password: string;
  info: string | null;
  phoneNumber: string;
}

export interface VerifyCompleteMutationArgs {
  phoneNumber: string;
  secretKey: string;
}

export interface VerifyStartMutationArgs {
  phoneNumber: string;
}

export interface LoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
}

export interface VerifyCompleteResponse {
  ok: boolean;
  error: string | null;
}

export interface VerifyStartResponse {
  ok: boolean;
  error: string | null;
}

export interface Verification {
  id: string;
  phoneNumber: string;
  secretKey: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
