<template>
  <div class="test">
    <virtual-list-load v-slot="slotProps" :list-data="listData" :estimated-item-size="70">
      <div class="list-item">{{ slotProps.item }}</div>
    </virtual-list-load>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  let listData = ref();
  listData.value = new Array(1000).fill(
    '推理服务模块 ：使用Echarts 展示接口调用记录、监控信息、实例信息等页面。数据清洗模块：清洗任务卡片分页展示、关键字搜索、图片、视频本地上传等功能。 自动学习模块：学习任务表格、子表格嵌套、删除、隐藏弹框、数据可视化图表等页面'
  );
  listData.value[12] = `项目特点:
    基于 JWT对用户登录进行身份认证；基于 showdown.js 实现 markdown 编辑器，支持图片导入、代码块、表格、字体加粗等效果。
    支持单文件、多文件上传、上传取消；支持图片、excel、pdf、docx 文档在线预览。
    引用 symbol 格式的 SVG，封装成图标组件，方便图标复用、调整大小和颜色。 `;
</script>

<style lang="less" scoped>
  .test {
    border: 1px solid black;
    height: 500px;
  }
  .list-item {
    padding: 2px 16px;
  }
</style>
