export interface UserInfo {
  id: number;
  name: string;
  username: string;
  request_token: string;
  access_token: string;
  session_id: string;
  avatar: string | null;
}
