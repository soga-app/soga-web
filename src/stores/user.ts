import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { User } from '@/api/user/index.d';

export const UserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'UserState',
  // state: 返回对象的函数
  state: () => ({
    // token
    token: '',
    // userInfo
    userInfo: {
      id: 0,
      roleId: 0,
      age: 0,
      phone: '',
      password: '',
      email: '',
      name: '',
      gender: '',
      avatar: '',
      createTime: ''
    },
    // 是否已有背单词计划
    hasLearningWordPlan: false
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getGender: (state) => {
      return state.userInfo.gender;
    },
    getHasLearningWordPlan: (state) => {
      return state.hasLearningWordPlan;
    },
    getUserName: (state) => {
      return state.userInfo.name;
    }
  },
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: User.User) {
      this.userInfo = userInfo;
    },
    setHasLearningWordPlan(has: boolean) {
      this.hasLearningWordPlan = has;
    }
  },
  persist: piniaPersistConfig('UserState', ['token', 'userInfo', 'hasLearningWordPlan'])
});
