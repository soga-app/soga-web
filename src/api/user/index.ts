import http from '@/api/config';
import { User } from './index.d';

export default {
  login: (params: User.LoginParams): Promise<string> => http.post('api/user/login', params),
  logout: (): Promise<string> => http.get('api/user/logout'),
  signUp: (params: User.RegisterParams): Promise<void> => http.post('api/user/insert', params),
  update: (params: User.UpdateParams): Promise<string> => http.put('api/user/update', params),
  select: (): Promise<string> => http.get('api/user/select'),
  validatePassword: (params: User.validatePasswordParams): Promise<string> =>
    http.post('api/user/password', params),
  updatePassword: (params: User.validatePasswordParams): Promise<string> =>
    http.put('api/user/password', params),
  sendToEmail: (params: User.SendToEmailParams): Promise<string> =>
    http.post('api/user/sendToEmail', params)
};
