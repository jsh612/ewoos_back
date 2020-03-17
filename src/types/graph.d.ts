export const typeDefs = ["type User {\n  id: ID!\n}\n\ntype Query {\n  thing: String\n}\n"];
/* tslint:disable */

export interface Query {
  thing: string | null;
}

export interface User {
  id: string;
}
