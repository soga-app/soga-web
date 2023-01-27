<template>
  <div class="body-wrapper">
    <div class="make-plan">
      <div class="dict-pick">
        <div class="dict-pick-free">免费词典</div>
        <div class="dict-pick-vip">vip专享词典</div>
      </div>
      <div class="dict-list">
        <n-space :size="24">
          <dictionary-card
            v-for="(dict, index) in dictList"
            :id="dict.id"
            :key="index"
            :name="dict.name"
            :count="dict.count"
            :num="index"
            :pick-id="pickDictId"
            @pickDict="handlePickDict"
          />
        </n-space>
      </div>
      <div class="plan-day-picker">
        <input-number-scroll :list="linkList" class="scroll" />
      </div>
      <div class="btn"> <n-button type="primary" size="large"> 确定计划 </n-button></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import DictionaryCard from './components/DictionaryCard.vue';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';

  let dictList = ref<Array<Dic.Dictionary>>();
  let pickDictId = ref();
  let list = ref<Array<number>>([]);
  list.value = new Array(20).fill(0).map((i, index) => index + 20);
  let linkList = ref<Array<string>>([]);

  onMounted(async () => {
    dictList.value = await api.dictionary.getDictionary();
    pickDictId.value = dictList.value[0].id;
    let pickWordSum = dictList.value[0].count;
    list.value.forEach((item: number) => {
      linkList.value.push(`${item}         ${Math.floor(pickWordSum / item)}`);
    });
  });
  function handlePickDict(id: string) {
    pickDictId.value = id;
  }
</script>

<style scoped lang="less">
  .body-wrapper {
    display: flex;
    justify-content: center;
    .make-plan {
      margin: 16px auto;
      background: #fff;
      padding: 24px 32px;
      color: #8a8a8a;
    }
    .dict-pick {
      display: flex;
      justify-content: center;
      margin-bottom: 46px;
      &-free,
      &-vip {
        width: 200px;
        height: 40px;
        box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
        border-radius: 6px 6px 6px 6px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
      &-free {
        color: #587acb;
        background: #cfd8ef;
      }
      &-vip {
        margin-left: 54px;
        color: #cbaa63;
        background: #faf3e1;
      }
    }
    .plan-day-picker {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      .scroll {
        width: 200px;
      }
    }
    .btn {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
