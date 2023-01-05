<template
  ><div class="dictionary">
    <button @click="getWordInfo">获得wordInfo</button>
    <div class="dictionary-content">
      <div class="search"> </div>
      <div class="word-content">
        <template v-if="!wordInfo">
          <div> </div>
        </template>
        <word-card v-else :word-info="wordInfo" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import WordCard from './components/WordCard.vue';
  import api from '@/api';

  let wordInfo = ref();

  const getWordInfo = async () => {
    wordInfo.value = await api.dictionary.getWordCard(1);
    console.log('wordInfo is', wordInfo);
  };
</script>

<style scoped lang="less">
  .dictionary {
    &-content {
      display: flex;
      justify-content: center;
    }
  }
</style>
