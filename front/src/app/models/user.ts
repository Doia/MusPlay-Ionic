import { PrivacyLevel } from "./PrivacyLevel";
import { Role, transformarRole } from "./role";


export class User {
    id: number;
    username: string;
    password?: string;
    email?: string;
    phone?: string;
    name?: string;
    lastName?: string;
    description?: string;
    roles?: Role[];
    token?: string;
    friends?: string[];
    enabled?: boolean;
    admin?: boolean;
    privacyLevel?: PrivacyLevel;
    friendsCount?: number;
    matchCount?: number;
    imagePath?: string;
    imageUrl?: string;
    privacyData?: PrivacyLevel;
  
    constructor(data: Partial<User>) {
      this.id = data.id!;
      this.username = data.username || '';
      this.password = data.password;
      this.email = data.email || '';
      this.phone = data.phone || '';
      this.name = data.name || '';
      this.lastName = data.lastName || '';
      this.description = data.description || '';
      this.roles = data.roles || [];
      this.token = data.token || '';
      this.friends = data.friends || [];
      this.enabled = data.enabled !== undefined ? data.enabled : true;
      this.admin = data.admin !== undefined ? data.admin : false;
      this.privacyLevel = data.privacyLevel;
      this.friendsCount = data.friendsCount || 0;
      this.matchCount = data.matchCount || 0;
      this.imagePath = data.imagePath || '';
      this.imageUrl = data.imageUrl || '';
      this.privacyData = data.privacyData;
    }
  }
  

