
import jwt from 'jsonwebtoken';
import { config } from '../config/index';


export function signJwt(payload: object) {

  return jwt.sign(payload, "ssf-edrr3-3cce", { "expiresIn": "1d" });
}


export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, "ssf-edrr3-3cce") as T;
}



