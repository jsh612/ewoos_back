import { User } from "./graph";
import { Request } from "express";
import "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: User;
}
