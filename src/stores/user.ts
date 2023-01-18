import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';

export const UserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'UserState',
  // state: 返回对象的函数
  state: () => ({
    // token
    token: '',
    // userInfo
    gender: ''
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getGender: (state) => {
      return state.gender;
    }
  },
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token;
    },
    // setGender
    setGender(gender: any) {
      this.gender = gender;
    }
  },
  persist: piniaPersistConfig('UserState', ['token', 'gender'])
});
