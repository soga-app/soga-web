import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';

export const CollectionStore = defineStore('collection', {
  state: () => {
    return {
      options: [],
      curChildOption: []
    };
  },
  getters: {
    getOptions: (state) => {
      return state.options;
    },
    getCurChildOption: (state) => {
      return state.curChildOption;
    }
  },
  actions: {
    updateOptions(options: any) {
      this.options = options;
    },
    updateChildOption(curChildOption: any) {
      this.curChildOption = curChildOption;
    }
  },
  persist: piniaPersistConfig('CollectionState', ['options', 'curChildOption'])
});
