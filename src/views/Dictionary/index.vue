<template
  ><div class="dictionary">
    <div class="dictionary-content">
      <div class="search">
        <n-input
          v-model:value="searchWord"
          type="text"
          placeholder="请输入要查询的单词"
          clearable
          @input="handleInputChange"
        >
          <template #suffix>
            <svg-icon
              name="icon-search"
              color="#587acb"
              class="search-icon"
              @click="getWordInfo(searchWord)"
            />
          </template>
        </n-input>
        <div
          v-if="wordRelatedOptions && wordRelatedOptions.length && searchOptionShow"
          class="dropdown"
        >
          <div class="dropdown-inner">
            <div
              v-for="item in wordRelatedOptions"
              :key="item.key"
              class="dropdown-option"
              @click="handelOptionChecked(item.key)"
              >{{ item.label }}</div
            >
          </div>
        </div>
      </div>
      <div class="word-content">
        <template v-if="!wordInfo">
          <div> </div>
        </template>
        <word-card v-else :word-info="wordInfo" @search-word="getWordInfo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import WordCard from './components/WordCard.vue';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';
  import { useRoute } from 'vue-router';

  let wordInfo = ref();
  const route = useRoute();
  let wordRelatedOptions = ref();
  let wordRelatedList = ref();
  let searchWord = ref('');
  let searchOptionShow = ref(false);

  const getWordInfo = async (word: string) => {
    wordInfo.value = await api.dictionary.getWordCard(word);
    console.log('wordInfo is', wordInfo);
  };

  watch(
    () => route.query,
    (newVal: any, oldVal: any) => {
      if (newVal?.word) {
        getWordInfo(newVal.word);
      }
    },
    { immediate: true }
  );

  async function handleInputChange(val: string) {
    console.log('input val:', val);
    if (val) {
      wordRelatedOptions.value = [];
      wordRelatedList.value = await api.dictionary.getRelatedWord(val);
      console.log('related list is', wordRelatedList);
      wordRelatedList.value.forEach((i: any) => {
        wordRelatedOptions.value.push({ label: i.word, key: i.word });
      });
      searchOptionShow.value = true;
    }
  }

  function handelOptionChecked(checkedOption: string) {
    searchOptionShow.value = false;
    searchWord.value = checkedOption;
    getWordInfo(checkedOption);
  }
</script>

<style scoped lang="less">
  .dictionary {
    background-color: rgba(242, 242, 242, 0.8);
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .search {
        position: relative;
        margin: 16px auto;
        width: 730px;
        .dropdown {
          background: #fff;
          position: absolute;
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.208);
          width: 730px;
          &-inner {
            padding: 4px;
          }
          &-option {
            height: 24px;
            line-height: 24px;
            color: #8a8a8a;
            &:hover {
              background-color: #5d80d016;
            }
          }
        }
      }
      .word-content {
        min-height: calc(100vh - 138px);
        background: #fff;
      }
      .search-icon {
        cursor: pointer;
      }
    }
  }
</style>
