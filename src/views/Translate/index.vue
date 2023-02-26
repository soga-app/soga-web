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
        <div class="trans-history">
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
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { TransLangMap } from './index';
  import api from '@/api';

  let transFromLang = ref('zh');
  let transToLang = ref('jp');
  let transText = ref('');
  let transResult = ref('');

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
    console.log('transResult', transResult.value);
  };

  const handleClear = () => {
    transText.value = '';
    transResult.value = '';
  };
</script>

<style lang="less" scoped>
  .body-wrap {
    display: flex;
    justify-content: center;
    padding-top: 24px;
    .translate-wrap {
      color: #666;
      width: 900px;
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
            width: 400px;
            height: 460px;
            margin-right: 16px;
          }
          .trans-to {
            margin-left: 16px;
          }
        }
        &-footer {
          padding-left: 16px;
        }
      }
    }
  }
</style>
