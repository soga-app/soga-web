// * 请求响应参数(不包含data)
export interface ResultData<T> {
  config: object;
  header: object;
  request: object;
  status: number;
  statusText: string;
  data: {
    code: number;
    data: T;
    msg: string;
  };
}

// * 请求响应参数(包含data)

// * 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// * 用户管理模块
export namespace User {
  export interface ReqGetUserParams {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: string;
    user: {
      detail: {
        age: number;
      };
    };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}
