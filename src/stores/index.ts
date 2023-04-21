import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(
  createPersistedState({
    serializer: {
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  })
);

export default pinia;
export * from './user';
export * from './collection';
