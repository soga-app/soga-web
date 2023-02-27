<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="确认"
    content="小主你的单词还没学习/复习完，你确定要离开吗?"
    positive-text="确认"
    negative-text="取消"
    @positive-click="handleEndLearning"
    @negative-click="showModal = false"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps(['showLeaveModal']);
  const emits = defineEmits(['endLearning', 'updateLeaveModal']);

  const showModal = computed({
    get: () => props.showLeaveModal,
    set: (val) => emits('updateLeaveModal', val)
  });

  const handleEndLearning = () => {
    emits('endLearning');
  };
</script>

<style lang="less" scoped></style>
