import http from '@/api/config';
import { User } from './index.d';

export default {
  login: (params: User.LoginParams): Promise<string> => http.post('api/user/login', params),
  signUp: (params: User.RegisterParams): Promise<void> => http.post('api/user/insert', params)
};
