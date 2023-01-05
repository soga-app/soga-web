<template>
  <div class="wordcard">
    <div class="word-layer">
      <div class="word-layer-first">
        <div class="word-layer-first-word">{{ wordInfo.word }}</div>
        <div class="word-layer-first-lmy">[{{ wordInfo.luomayin }}]</div>
        <div class="word-layer-first-audio">
          <div class="audio-icon-female">
            <svg-icon color="#e695bb" font-size="20px" name="icon-mic" />
          </div>
          <div class="audio-icon-male"></div>
          <div></div>
        </div>
      </div>
      <div class="word-layer-second"></div>
      <div class="word-layer-meaning"></div>
      <div class="word-layer-remain"></div> </div
  ></div>
</template>

<script lang="ts" setup>
  import { Dic } from '@/api/dictionary/index.d';

  interface Props {
    wordInfo: Dic.WordInfo;
  }

  const props = defineProps<Props>();
</script>

<style lang="less" scoped>
  div[class^='word-layer'] {
    display: flex;
    color: #8a8a8a;
  }

  .wordcard {
    background: #fff;
    padding: 24px;

    .word-layer-first {
      font-size: 16px;
      font-weight: bold;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      align-items: center;
      &-word {
        margin-right: 40px;
        color: #8a8a8a;
      }
      &-lmy {
        color: #8a8a8a;
      }
    }
  }
</style>
