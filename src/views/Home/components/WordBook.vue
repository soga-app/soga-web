<template>
  <div class="book-list">
    <div style="text-align: right">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span>
            <svg-icon
              name="icon-xiazai"
              font-size="16px"
              hover-color="#587acb"
              @click="downloadPdf('生词本')"
          /></span>
        </template>
        导出生词本
      </n-tooltip></div
    >
    <div id="pdfcontent">
      <div class="book-list-title">生词列表</div>
      <div v-for="(item, index) in wordList" :key="item" class="book-list-item">
        <div class="item-num">{{ `(${index + 1})` }}</div>
        <div class="item-key">单词</div>
        <div class="item-word">{{ item.word }}</div>
        <div class="item-key">释义</div>
        <div class="item-meaning">{{ item.meaning }}</div>
      </div></div
    >
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import api from '@/api';
  import ExportSavePdf from '@/util/html2pdf';
  let wordList = ref();

  onMounted(async () => {
    wordList.value = await api.dictionary.getWordBookList();
    console.log(wordList.value);
  });
  const downloadPdf = (name: string) => {
    // const time = moment().format('YYYY年MM月D日');
    window.$message.info('开始下载文档');
    const d = new Date();
    ExportSavePdf('pdfcontent', name.substring(0, 15), d.getMonth() + d.getDate());
  };
</script>

<style lang="less" scoped>
  .book-list {
    padding: 24px;
    background-color: #fff;
    color: #8a8a8a;
    &-title {
      text-align: center;
      color: #587acb;
      font-size: 18px;
      font-weight: bold;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
  }
  .item {
    &-num {
      margin-right: 6px;
      color: #575757;
    }
    &-key {
      font-size: 12px;
      color: #fff;
      background-color: #93ace7c1;
      padding: 2px 4px;
      border-radius: 2px;
      margin-right: 16px;
    }
    &-word {
      font-size: 16px;
      font-weight: bold;
      margin-right: 26px;
    }
    &-meaning {
      font-size: 14px;
      border-bottom: 2px dashed #ccc;
    }
  }
</style>
