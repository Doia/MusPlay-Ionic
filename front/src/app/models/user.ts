import { PrivacyLevel } from "./PrivacyLevel";
import { Role } from "./role";

export class User {

    privacyData?: PrivacyLevel;
    id?: string;
    username?: string;
    email?: String;
    password?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    description?: string
    roles?: Role[];
    token?: string;
    friends?: string[];
    enabled?: boolean;
    admin?: boolean;
    privacyLevel?: PrivacyLevel;
    friendsCount?: number;
    matchCount?: number;
    imagePath?: string;
}
