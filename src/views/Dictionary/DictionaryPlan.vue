<template>
  <div class="body-wrapper">
    <div class="make-plan">
      <div class="dict-pick">
        <div class="dict-pick-free">免费词典</div>
        <div class="dict-pick-vip">vip专享词典</div>
      </div>
      <div v-if="dictList" class="dict-list">
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
      <template v-else>
        <div style="width: 746px"> <list-loading :row="1" /></div>
      </template>
      <div class="plan-day-picker">
        <div class="dicDayChoose">
          <div v-if="dictList" class="dicName">{{ dictList[pickIndex].name }}</div>
          <div class="choose-title"
            ><n-space :size="15"><div>每天背单词</div><div>完成天数</div> </n-space></div
          >
          <input-number-scroll :list="linkList" class="scroll" @pickOption="handlePickOption"
        /></div>
      </div>
      <div class="btn">
        <n-button type="primary" size="large" @click="createLearningPlan"> 确定计划 </n-button></div
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import DictionaryCard from './components/DictionaryCard.vue';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';
  import { UserStore } from '@/stores';
  import { useRouter } from 'vue-router';

  const userStore = UserStore();
  const router = useRouter();
  let dictList = ref<Array<Dic.Dictionary>>();
  let pickDictId = ref(0);
  let pickIndex = ref(0);
  let pickOption = ref(0);
  let pickWordSum = ref(0);
  let list = ref<Array<number>>([]);
  list.value = new Array(20).fill(0).map((i, index) => index + 20);
  let linkList = ref<Array<string>>([]);

  onMounted(async () => {
    dictList.value = await api.dictionary.getDictionary();
    pickDictId.value = dictList.value[0].id;
    pickWordSum.value = dictList.value[0].count;
    list.value.forEach((item: number) => {
      linkList.value.push(`${item}         ${Math.floor(pickWordSum.value / item)}`);
    });
  });

  function handlePickDict(id: number, num: number) {
    pickDictId.value = id;
    pickIndex.value = num;
    pickWordSum.value = (dictList.value as Array<Dic.Dictionary>)[num]?.count;
    linkList.value = [];
    list.value.forEach((item: number) => {
      linkList.value.push(`${item}         ${Math.floor(pickWordSum.value / item)}`);
    });
  }

  function handlePickOption(num: number) {
    pickOption.value = num;
  }

  async function createLearningPlan() {
    let dictId = pickDictId.value;
    let option = list.value[pickOption.value];
    let timeSpan = Math.floor(pickWordSum.value / option);
    const res = await api.dictionary.addPlan({ dictId, timeSpan });
    if (!res) {
      userStore.setHasLearningWordPlan(true);
      router.push({ name: 'Reciteword' });
    }
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
      .dicDayChoose {
        border: 1px solid #eee;
        padding: 15px 32px;
        border-radius: 4px;
        .dicName {
          border-bottom: 1px solid #eee;
          padding-bottom: 6px;
          font-size: 16px;
          font-weight: bold;
          color: #888;
        }
        .choose-title {
          padding: 0 32px;
          margin-top: 4px;
          font-size: 12px;
          color: #aaa;
          font-weight: 600;
        }
      }
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
