<template>
  <div class="skeleton" :style="{ padding: hasPadding ? '24px' : '0' }">
    <div v-for="(num, index) in row" :key="`${num}@${index}`" class="skeleton-each">
      <n-space vertical :size="20">
        <div class="line-1"
          ><n-skeleton circle height="36px" style="margin-right: 35px" />
          <n-skeleton round height="16px" width="30%"
        /></div>
        <div class="line-2"><n-skeleton height="16px" round width="95%" /></div>
        <div class="line-3"><n-skeleton height="16px" round width="95%" /></div>
        <div class="line-4"><n-skeleton height="16px" round width="60%" /></div>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    row?: number;
    hasPadding?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    row: 1,
    hasPadding: false
  });
</script>

<style lang="less" scoped>
  .skeleton {
    .line-1 {
      display: flex;
      align-items: center;
    }
    .skeleton-each {
      margin-bottom: 24px;
    }
  }
</style>
