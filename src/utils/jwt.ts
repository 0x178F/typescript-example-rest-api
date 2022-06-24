import jwt from 'jsonwebtoken';

export function sign(data: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(data, process.env.ACCESS_TOKEN as jwt.Secret, options);
}

export function decode(token: string) {
  try {
    const decoded = <jwt.JwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN as jwt.Secret);
    return decoded;
  } catch (error: any) {
    return {expired: error.message === "jwt expired"};
  }
}