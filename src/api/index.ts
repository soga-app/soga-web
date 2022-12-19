// import { get } from "@/api/config";
import { post } from '@/api/config';

export const Login = (params: any) => {
  return post('api/user/loginUsername', params);
};

export const SignUp = (params: any) => {
  return post('api/user/insert', params);
};
