import { ITokenData } from "../interfaces/token-data.interface";

export const decodeTokenToString = (token: string): string => {
    const base64 = token.split('.')[1];
    return atob(base64);
} 

export const decodeTokenToObj = (token: string): ITokenData => {
    const tokenString = decodeTokenToString(token);

    return JSON.parse(tokenString);
}
