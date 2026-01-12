import { Roles } from "src/users/user/types/roles";

export class ValidatedPayloadDto {
    id: number;
    username: string;
    email: string;
    status: string;
    phoneNumber: string;
}

export type FullUserPayload = ValidatedPayloadDto & {
    roles: string[];
    lastLogin: Date;
};