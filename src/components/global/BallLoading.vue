<template>
  <!-- 两个小球左右移动加载效果https://cssfx.netlify.app/ -->
  <div class="balls">
    <div :style="{ backgroundColor: ballColor }"></div>
    <div :style="{ backgroundColor: ballColor }"></div>
    <div :style="{ backgroundColor: ballColor }"></div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, toRef } from 'vue';
  const props = defineProps({
    ballColor: {
      type: String,
      default: '#fc2f70'
    }
  });
  const ballColor = toRef(props, 'ballColor');

  onMounted(() => {
    const balls = document.querySelector('.balls') as HTMLDivElement;
    const children = balls?.childNodes as NodeList;
    for (var i = 0; i < children.length; i++) {
      (children[i] as HTMLElement).style.backgroundColor = props.ballColor;
    }
  });
</script>

<style lang="less" scoped>
  .balls {
    width: 4em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .balls div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
  }

  .balls div:nth-of-type(1) {
    transform: translateX(-100%);
    animation: left-swing 0.5s ease-in alternate infinite;
  }

  .balls div:nth-of-type(3) {
    transform: translateX(-95%);
    animation: right-swing 0.5s ease-out alternate infinite;
  }

  @keyframes left-swing {
    50%,
    100% {
      transform: translateX(95%);
    }
  }

  @keyframes right-swing {
    50% {
      transform: translateX(-95%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
