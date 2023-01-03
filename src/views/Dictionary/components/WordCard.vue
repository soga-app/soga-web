<template>
  <div class="word-card">
    <div class="word-layer">
      <div class="word-layer-first"></div>
      <div class="word-layer-second"></div>
      <div class="word-layer-meaning"></div>
      <div class="word-layer-remain"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  let word = defineProps(['word']);
</script>

<style lang="less" scoped>
  div[class^='word-layer'] {
    display: flex;
  }
</style>
