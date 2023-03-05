<template>
  <div class="body-wrap">
    <div class="translate-wrap">
      <div class="header">
        <div>{{ TransLangMap[transFromLang] }}</div>
        <div class="reverse-icon" @click="reverseLang">
          <svg-icon name="icon-zhihuan" color="#888" font-size="18px" hover-color="#587acb" />
        </div>
        <div>{{ TransLangMap[transToLang] }}</div>
        <div class="btn-trans">
          <n-button strong secondary size="small" type="info" @click="handleTrans">翻译</n-button>
        </div>
        <div class="trans-history" @click="getTransHistory">
          <svg-icon name="icon-time" />
          <span class="trans-history-text">翻译历史</span>
        </div>
      </div>
      <div class="content">
        <div class="content-main">
          <div class="trans-from"
            ><n-input
              v-model:value="transText"
              type="textarea"
              placeholder="请输入需要翻译的文本"
              :autosize="{ minRows: 21, maxRows: 21 }"
            />
          </div>
          <div class="delimiter"></div>
          <div class="trans-to" v-html="transResult"></div
        ></div>
        <div class="content-footer">
          <svg-icon
            name="icon-shanchu"
            font-size="18px"
            color="#888"
            hover-color="#587acb"
            :cursor-to-pointer="true"
            @click="handleClear"
          />
        </div>
      </div>
    </div>
    <div v-if="transHistoryShow" class="translate-history">
      <div class="close-btn">
        <svg-icon name="icon-guanbi" font-size="14px" @click="transHistoryShow = false" />
      </div>
      <div
        v-for="(item, index) in transHistoryList"
        :key="item.createTime"
        class="history-item"
        @click="showHistory(index)"
      >
        <div class="history-item-up"
          ><div class="history-item-up-content">
            {{ item.content }}
          </div></div
        >
        <div class="history-item-down">
          <div class="history-item-down-left"
            >{{ TransLangMap[item.fromLanguage] }} <span>转</span>
            {{ TransLangMap[item.toLanguage] }}</div
          >
          <div class="history-item-down-right">
            {{ item.createTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { TransLangMap } from './index';
  import api from '@/api';
  import { Trans } from '@/api/translation/index.d';

  let transFromLang = ref('zh');
  let transToLang = ref('jp');
  let transText = ref('');
  let transResult = ref('');
  let transHistoryShow = ref(false);
  let transHistoryList = ref<Array<Trans.TransHistoryItem>>();

  const reverseLang = () => {
    let temp = transFromLang.value;
    transFromLang.value = transToLang.value;
    transToLang.value = temp;
  };

  const handleTrans = async () => {
    const { trans_result } = await api.translation.translate({
      from: transFromLang.value,
      to: transToLang.value,
      query: transText.value
    });
    transResult.value = trans_result.reduce((pre, next) => pre + next.dst + '<br/>', '');
  };

  const handleClear = () => {
    transText.value = '';
    transResult.value = '';
  };

  const getTransHistory = async () => {
    transHistoryShow.value = true;
    transHistoryList.value = await api.translation.translateHistory();
  };

  const showHistory = (index: number) => {
    if (transHistoryList.value) {
      transText.value = transHistoryList.value[index].content;
      transResult.value = transHistoryList.value[index].result;
    }
  };
</script>

<style lang="less" scoped>
  .body-wrap {
    display: flex;
    justify-content: center;
    padding-top: 24px;
    .translate-wrap {
      color: #666;
      width: 800px;
      height: 600px;
      background: #fff;
      border-radius: 5px;
      .header {
        height: 48px;
        line-height: 48px;
        padding-left: 24px;
        margin: 0 4px;
        font-size: 16px;
        display: flex;
        border-bottom: 1px solid #eee;
        align-items: center;
        position: relative;
        .reverse-icon {
          display: inline-block;
          margin: 0 24px;
          cursor: pointer;
        }
        .btn-trans {
          margin-left: 40px;
        }
        .trans-history {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          padding: 0 8px;
          height: 36px;
          // background: #e2e7fab1;
          border-radius: 10px;
          color: #666;
          margin-left: 20px;
          cursor: pointer;
          &:hover {
            color: #587acb;
          }
          &-text {
            margin-left: 4px;
            display: inline-block;
          }
        }
      }
      .content {
        &-main {
          padding: 16px 24px;
          height: 484px;
          display: flex;
          .delimiter {
            width: 1px;
            height: 480px;
            background: #ddd;
          }
          .trans-from {
            width: 360px;
            height: 460px;
            margin-right: 16px;
          }
          .trans-to {
            width: 360px;
            margin-left: 16px;
          }
        }
        &-footer {
          padding-left: 16px;
        }
      }
    }
    .translate-history {
      background: #fff;
      padding: 18px;
      margin-left: 24px;
      width: 300px;
      height: 564px;
      overflow-y: auto;
    }
    .close-btn {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 4px;
    }
    .history-item {
      margin-bottom: 20px;
      padding: 6px;
      cursor: pointer;
      &:hover {
        background: #f0f0d76e;
      }
      &-up {
        background: #f2f3fa;
        border-radius: 10px;
        color: #666;
        margin-bottom: 4px;
        padding: 8px;
        &-content {
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          max-width: 288px;
        }
      }
      &-down {
        display: flex;
        justify-content: space-between;
        color: #555;
        font-size: 12px;
      }
    }
  }
</style>
