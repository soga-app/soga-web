import http from '@/api/config';

export const Login = (params: any) => {
  return http.post<string>('api/user/loginUsername', params);
};

export const SignUp = (params: any) => {
  return http.post('api/user/insert', params);
};
