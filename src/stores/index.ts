import { defineStore, createPinia } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const GlobalStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: 'GlobalState',
    // state: 返回对象的函数
    state: () => ({
        // token
        token: '',
        // userInfo
        userInfo: ''
    }),
    getters: {},
    actions: {
        // setToken
        setToken(token: string) {
            this.token = token;
        },
        // setUserInfo
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
        }
    },
    persist: piniaPersistConfig('GlobalState')
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
