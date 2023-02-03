export namespace User {
  interface LoginParams {
    username?: string;
    phone?: string;
    password?: string;
    email?: string;
    verifyCode?: string;
  }
  interface RegisterParams {
    name: string;
    password: string;
    gender: string;
    phone: string;
    email: string;
  }

  interface SendToEmailParams {
    email: string;
  }

  interface UpdateParams {
    age: number;
    phone: string;
    email: string;
    name: string;
    gender: string;
  }

  interface validatePasswordParams {
    password: string;
  }
  interface UserInfo {
    user: User;
    token: string;
  }
  interface User {
    id: number;
    roleId: number;
    age: number;
    phone: string;
    password: string;
    email: string;
    name: string;
    gender: string;
    avatar: string;
    createTime: string;
  }
}
