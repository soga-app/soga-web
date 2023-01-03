<template>
  <svg class="icon" aria-hidden="true" :style="{ color: color, fontSize: fontSize }">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script lang="ts" setup>
  import { toRef } from 'vue';
  const props = defineProps({
    name: String,
    fontSize: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: '#666'
    }
  });
  let name = toRef(props, 'name');
  let color = toRef(props, 'color');
</script>

<style lang="less" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
