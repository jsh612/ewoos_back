export const typeDefs = ["type CreateCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateComment(text: String!, postId: String!): CreateCommentResponse!\n  UploadPost(title: String!, location: String!, desc: String!, category: String!, files: [String!]): UploadPostResponse!\n  RentStatusUpdate(status: RentStatus!, rentId: String!): RentStatusResponse!\n  ReqRent(postId: String!, message: String!): ReqRentResponse!\n  ChangePW(oldPW: String!, newPW: String!): ChangePWResponse!\n  Login(userId: String!, password: String!): LoginResponse!\n  SignUp(userId: String!, username: String!, password: String!, info: String, phoneNumber: String!): SignUpResponse!\n  UpdateProfile(username: String, info: String): UpdateProfileResponse!\n  VerifyComplete(phoneNumber: String!, secretKey: String!): VerifyCompleteResponse!\n  VerifyStart(phoneNumber: String!): VerifyStartResponse!\n}\n\ntype User {\n  id: ID!\n  userId: String!\n  username: String!\n  password: String!\n  info: String\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  posts: [Post!]\n  rents: [Rent!]\n  comments: [Comment!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Post {\n  id: ID!\n  user: User!\n  title: String!\n  location: String!\n  desc: String!\n  # category: CategoryOptions!\n  category: String!\n  files: [File]\n  rents: [Rent]\n  comments: [Comment]\n  createdAt: String\n  updatedAt: String\n}\n\nenum RentStatus {\n  APPLY\n  RENT\n  DONE\n}\n\ntype Rent {\n  id: ID!\n  post: Post!\n  user: User!\n  message: String!\n  status: RentStatus!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: ID!\n  phoneNumber: String!\n  secretKey: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  thing: String\n  CategoryPost(category: String, pageNumber: Int!, items: Int!): CategoryPostResponse\n  PostDetail(postId: String!): PostDetailResponse\n  SearchPost(term: String!): SearchPostResponse!\n  GetMe: GetMeResponse\n}\n\ntype CategoryPostResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype PostDetailResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype SearchPostResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype UploadPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype RentStatusResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ReqRentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ChangePWResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMeResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype LoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  username: String\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype VerifyCompleteResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype VerifyStartResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  thing: string | null;
  CategoryPost: CategoryPostResponse | null;
  PostDetail: PostDetailResponse | null;
  SearchPost: SearchPostResponse;
  GetMe: GetMeResponse | null;
}

export interface CategoryPostQueryArgs {
  category: string | null;
  pageNumber: number;
  items: number;
}

export interface PostDetailQueryArgs {
  postId: string;
}

export interface SearchPostQueryArgs {
  term: string;
}

export interface CategoryPostResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface Post {
  id: string;
  user: User;
  title: string;
  location: string;
  desc: string;
  category: string;
  files: Array<File> | null;
  rents: Array<Rent> | null;
  comments: Array<Comment> | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface User {
  id: string;
  userId: string;
  username: string;
  password: string;
  info: string | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  posts: Array<Post>;
  rents: Array<Rent>;
  comments: Array<Comment>;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Rent {
  id: string;
  post: Post;
  user: User;
  message: string;
  status: RentStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export type RentStatus = "APPLY" | "RENT" | "DONE";

export interface Comment {
  id: string;
  text: string;
  user: User;
  post: Post;
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

export interface PostDetailResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface SearchPostResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface GetMeResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateComment: CreateCommentResponse;
  UploadPost: UploadPostResponse;
  RentStatusUpdate: RentStatusResponse;
  ReqRent: ReqRentResponse;
  ChangePW: ChangePWResponse;
  Login: LoginResponse;
  SignUp: SignUpResponse;
  UpdateProfile: UpdateProfileResponse;
  VerifyComplete: VerifyCompleteResponse;
  VerifyStart: VerifyStartResponse;
}

export interface CreateCommentMutationArgs {
  text: string;
  postId: string;
}

export interface UploadPostMutationArgs {
  title: string;
  location: string;
  desc: string;
  category: string;
  files: Array<string>;
}

export interface RentStatusUpdateMutationArgs {
  status: RentStatus;
  rentId: string;
}

export interface ReqRentMutationArgs {
  postId: string;
  message: string;
}

export interface ChangePwMutationArgs {
  oldPW: string;
  newPW: string;
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

export interface UpdateProfileMutationArgs {
  username: string | null;
  info: string | null;
}

export interface VerifyCompleteMutationArgs {
  phoneNumber: string;
  secretKey: string;
}

export interface VerifyStartMutationArgs {
  phoneNumber: string;
}

export interface CreateCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface UploadPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface RentStatusResponse {
  ok: boolean;
  error: string | null;
}

export interface ReqRentResponse {
  ok: boolean;
  error: string | null;
}

export interface ChangePWResponse {
  ok: boolean;
  error: string | null;
}

export interface LoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  username: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateProfileResponse {
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
