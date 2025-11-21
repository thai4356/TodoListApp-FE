export interface TeamDetailRes {
  id: number;
  name: string;
  description: string;
  owner: UserDetailRes;
  members: TeamMemberRes[];
  createdAt: string;   // ISO string
  updatedAt: string;   // ISO string
}

export interface TeamMemberRes {
  id: number;               // user_id
  fullName: string;
  email: string;
  avatarUrl: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;         // ISO string (LocalDateTime from backend)
}

export interface UserDetailRes {
  /** @format int32 */
  id?: number;
  name?: string;
  email?: string;
}

export interface AddTeamBaseReq {
  name: string;
  description: string;
  user: number;      // owner id
}

export interface UserRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
}

export interface UserReq {
  id: number;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
}

export interface TeamDetailRes {
  id: number;
  name: string;
  description: string;
  // thêm gì nữa thì bổ sung sau
}