<template>
  <div class="book-mark-dropdown">
    <slot class="trigger"></slot>
    <div class="display-content">
      <div class="display-content-left">111</div>
      <div class="display-content-right">222</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .book-mark-dropdown {
    .tirgger {
      position: relative;
    }
    .display-content {
      width: 400px;
      background: #fff;
      box-shadow: 1px 1px 2px rgba(218, 215, 215, 0.5);
      padding: 16px 18px;
      position: absolute;
      display: flex;
      left: -200px;
    }
  }
</style>
