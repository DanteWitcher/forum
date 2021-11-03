import { ERole } from "../enums/role.enum";

export interface ITokenData {
    email: string;
    exp: number;
    iat: number;
    role: ERole;
}
