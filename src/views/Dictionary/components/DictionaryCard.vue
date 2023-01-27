<template>
  <div class="card">
    <div
      class="card-cover"
      :style="{
        background: bgColor[num]
      }"
      @click="handleCheckDict"
    >
      <div class="card-info">
        <div class="card-info-name">{{ name }}</div>
        <div class="card-info-count">{{ count }}</div>
      </div>
      <div v-show="id === pickId" class="card-checked">
        <div class="card-checked-triangle">
          <svg-icon class="icon-check" color="#0074e8" name="icon-duigou" font-size="20px" />
        </div>
        <div class="card-checked-square"></div
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const props = defineProps(['name', 'count', 'num', 'id', 'pickId']);
  const emit = defineEmits(['pickDict']);
  const bgColor = ref([
    'linear-gradient(136deg, #587ACB 0%, rgba(88,122,203,0) 100%)',
    ' linear-gradient(137deg, #7271C8 0%, rgba(114,113,200,0) 100%)',
    'linear-gradient(137deg, #8967C0 0%, rgba(137,103,192,0) 100%)',
    'linear-gradient(136deg, #9F5BB4 0%, rgba(159,91,180,0) 100%)',
    'linear-gradient(139deg, #B14DA5 0%, rgba(177,77,165,0) 100%)'
  ]);
  const bgImage = ref([
    'url("/src/assets/img/dictionary/1.png")',
    'url("../../assets/img/dictionary/2.png")',
    'url("../../assets/img/dictionary/3.png")',
    'url("../../assets/img/dictionary/4.png")',
    'url("../../assets/img/dictionary/5.png")'
  ]);

  function handleCheckDict() {
    emit('pickDict', props.id);
  }
</script>

<style lang="less" scoped>
  .card {
    cursor: pointer;
    &-cover {
      position: relative;
      width: 130px;
      height: 150px;
      border-radius: 6px;
      box-shadow: 2px 3px 2px rgba(84, 81, 81, 0.208);
      opacity: 0.7;
      background-repeat: no-repeat;
      background-size: contain;
    }
    &-checked-triangle {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border: 20px solid;
      border-color: #c6d2f0 #c6d2f0 transparent transparent;
      .icon-check {
        position: absolute;
        top: -16px;
        right: -18px;
      }
    }
    &-checked-square {
      position: absolute;
      top: 0;
      left: 0;
      background-color: transparent;
      border: 3px solid #0074e8;
      width: 127px;
      height: 147px;
      border-radius: 6px;
    }
    &-info {
      padding: 16px;
      color: #fff;
      font-size: 14px;
      &-count {
        margin-top: 8px;
      }
    }
  }
</style>
