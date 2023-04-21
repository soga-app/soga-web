<template>
  <svg
    class="icon"
    aria-hidden="true"
    :style="{ color: curColor, fontSize: fontSize, cursor: cursorToPointer ? 'pointer' : 'auto' }"
    @mouseover="curColor = hoverColor ? hoverColor : color"
    @mouseout="curColor = color"
  >
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script lang="ts" setup>
  import { ref, toRef } from 'vue';
  const props = defineProps({
    name: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: '#666'
    },
    hoverColor: {
      type: String,
      default: ''
    },
    cursorToPointer: {
      type: Boolean,
      default: true
    }
  });

  let curColor = ref<string>('');
  let name = toRef(props, 'name');
  let color = toRef(props, 'color');
  curColor.value = color.value;

  // if (props.hoverColor) {
  //   console.log('yes', props.hoverColor);
  //   let icon = document.getElementById('svgIcon');
  //   icon?.style.setProperty('--hover', props.hoverColor);
  //   console.log(icon?.style.getPropertyValue('--hover'));
  // }
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
