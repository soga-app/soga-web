<template>
  <div class="body-wrap">
    <div class="translate-wrap">
      <div class="header">
        <div>{{ transFromLang }}</div>
        <div class="reverse-icon" @click="reverseLang">
          <svg-icon name="icon-zhihuan" color="#587acb" font-size="16px" />
        </div>
        <div>{{ transToLang }}</div>
        <div class="btn-trans">
          <n-button strong secondary size="small" type="info">翻译</n-button>
        </div>
      </div>
      <div class="content">
        <div class="content-main">
          <div class="trans-from"
            ><n-input
              type="textarea"
              placeholder="请输入需要翻译的文本"
              :autosize="{ minRows: 21, maxRows: 21 }"
            />
          </div>
          <div class="delimiter"></div>
          <div class="trans-to"></div
        ></div>
        <div class="content-footer">
          <svg-icon
            name="icon-shanchu"
            font-size="18px"
            color="#888"
            hover-color="#587acb"
            :cursor-to-pointer="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  let transFromLang = ref('汉语');
  let transToLang = ref('日语');

  const reverseLang = () => {
    let temp = transFromLang.value;
    transFromLang.value = transToLang.value;
    transToLang.value = temp;
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
        .reverse-icon {
          display: inline-block;
          margin: 0 24px;
          cursor: pointer;
        }
        .btn-trans {
          margin-left: 40px;
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
