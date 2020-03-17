export const typeDefs = ["type User {\n  id: ID!\n  username: String!\n  password: String!\n  email: String!\n  verifiedEmail: Boolean!\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  post: [Post!]\n  rents: [Rent!]\n  comments: [Comment!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Post {\n  id: ID!\n  user: User!\n  title: String!\n  location: String!\n  desc: String!\n  files: [File!]!\n  rents: [Rent!]\n  comments: [Comment!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype Rent {\n  id: ID!\n  post: Post!\n  user: User!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  user: User!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype File {\n  id: ID!\n  url: String!\n  post: Post!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: ID!\n  target: String!\n  key: String!\n  payload: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  thing: String\n}\n"];
/* tslint:disable */

export interface Query {
  thing: string | null;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  verifiedEmail: boolean;
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

export interface Verification {
  id: string;
  target: string;
  key: string;
  payload: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
