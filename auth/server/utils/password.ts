import { Argon2id } from "oslo/password";

export async function authHashPassword(password: string) {
  return await new Argon2id().hash(password);
}

export async function authVerifyPassword(password: string, hash: string) {
  return await new Argon2id().verify(hash, password);
}
