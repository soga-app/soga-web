import { defineStore } from 'pinia';

export const collectionStore = defineStore('collection', {
  state: () => {
    return {
      options: {},
      curChildOption: {}
    };
  },
  actions: {
    updateOptions(options: object) {
      this.options = options;
    }
  }
});
