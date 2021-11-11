import { ERole } from "../enums/role.enum";

export interface IProfile {
	id: string;
	email: string;
	role: ERole;
	firstName: string;
	middleName: string;
	lastName: string;
	nickName: string;
	phone: string;
    photoUrl: string;
    createDateTime: Date;
    lastChangedDateTime: Date;
}
