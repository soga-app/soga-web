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
  }
}
