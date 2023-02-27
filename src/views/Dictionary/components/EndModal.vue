<template>
  <n-modal v-model:show="showModal" :style="endModalStyle" :mask-closable="false">
    <div class="end-content">
      <div class="end-content-left"> <img :src="celebrateImg" class="end-content-left-img" /></div>
      <div class="end-content-right">
        <div class="end-header-title">Well&nbsp;Done !!!</div>
        <div style="margin-left: 16px"
          ><div>小主你真棒！</div>
          <div style="margin-bottom: 16px">坚持学习了{{ learnTime }}分钟！</div>
          <div style="margin-bottom: 16px"><span class="end-key">新词</span>15个</div>
          <div><span class="end-key">旧词</span>15个</div></div
        >
        <div class="end-content-right-btn">
          <n-button secondary round strong type="primary" @click="handleLeaveLearning"
            >完成打卡</n-button
          >
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
  import celebrateImg from '@/assets/img/dictionary/celebrate.png';
  import { computed, ref } from 'vue';

  const endModalStyle = ref({ width: '500px', borderRadius: '6px' });
  const props = defineProps(['showEndModal', 'learnTime']);
  const emits = defineEmits(['leaveLearning', 'updateEndModal']);
  const showModal = computed({
    get: () => props.showEndModal,
    set: () => emits('updateEndModal')
  });

  const handleLeaveLearning = () => {
    emits('updateEndModal');
    emits('leaveLearning');
  };
</script>

<style lang="less" scoped>
  .end-content {
    display: flex;
    width: 100%;
    padding: 16px 24px;
    background: #fff;
    background-image: url('@/assets/img/dictionary/string.png');
    background-size: 28% 50%;
    background-position: right top;
    background-repeat: no-repeat;
    &-left {
      width: 97px;
      position: relative;
      &-img {
        width: 100%;
        height: 95px;
        position: absolute;
        bottom: 10px;
      }
    }
    &-right {
      margin-left: 20px;
      margin-top: 32px;
      .end-header-title {
        color: #7e9ff1;
        font-size: 28px;
        font-weight: bold;
      }
      .end-key {
        display: inline-block;
        margin-right: 8px;
        color: #fff;
        padding: 1px 8px;
        background: #a9bced;
        border-radius: 12px;
      }
      &-btn {
        width: 282px;
        margin-top: 24px;
        text-align: center;
      }
    }
  }
</style>
