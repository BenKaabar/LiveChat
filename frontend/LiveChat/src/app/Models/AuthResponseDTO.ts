import { User } from "./User";

export interface AuthResponseDTO {
    token: string;
    user: User;
}
