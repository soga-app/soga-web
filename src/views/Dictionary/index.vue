<template
  ><div class="dictionary">
    <div class="dictionary-content">
      <div class="search" @mouseleave="leave" @mouseenter="enter">
        <n-input
          v-model:value="searchWord"
          type="text"
          placeholder="请输入要查询的单词"
          clearable
          class="search-input"
          @input="handleInputChange()"
          @focus="searchOptionShow = searchWord ? true : false"
          @clear="wordRelatedOptions = []"
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
          v-show="wordRelatedOptions && wordRelatedOptions.length && searchOptionShow"
          class="dropdown"
        >
          <div class="dropdown-inner">
            <div
              v-for="item in wordRelatedOptions"
              :key="item.key"
              class="dropdown-option"
              @click="handelOptionChecked(item.key)"
            >
              <span class="dropdown-option-left">{{ item.label.word }}</span>
              <span class="dropdown-option-right">{{ item.label.meaning }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="word-content">
        <word-card
          :word-info="wordInfo"
          @search-word="handelSearchWord"
          @update-word-card="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import WordCard from './components/WordCard.vue';
  import api from '@/api';
  import { throttle } from '@/util';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  let wordInfo = ref();
  let wordRelatedOptions = ref();
  let wordRelatedList = ref();
  let searchWord = ref('');
  let searchOptionShow = ref(false);
  let curWord = ref('');

  const getWordInfo = async (word: string) => {
    wordInfo.value = await api.dictionary.getWordCard(word);
  };

  watch(
    () => route.params,
    (newVal: any, oldVal: any) => {
      if (newVal?.word) {
        curWord.value = newVal.word;
        getWordInfo(newVal.word);
      }
    },
    { immediate: true }
  );

  const handleInputChange = throttle(async function () {
    let val = searchWord.value;
    if (val) {
      wordRelatedOptions.value = [];
      wordRelatedList.value = await api.dictionary.getRelatedWord(val);
      wordRelatedList.value.forEach((i: any) => {
        const { word, meaning } = i;
        wordRelatedOptions.value.push({ label: { word, meaning }, key: word });
      });
      searchOptionShow.value = true;
    } else {
      wordRelatedOptions.value = [];
      wordRelatedList.value = [];
    }
  });

  function handelOptionChecked(checkedOption: string) {
    searchOptionShow.value = false;
    searchWord.value = checkedOption;
    // getWordInfo(checkedOption);
    router.push({ name: 'Dictionary', params: { word: checkedOption } });
  }
  function leave() {
    searchOptionShow.value = false;
  }

  function enter() {
    searchOptionShow.value = true;
  }
  async function handelSearchWord(word: string) {
    wordInfo.value = [];
    // getWordInfo(word);
    router.push({ name: 'Dictionary', params: { word } });
  }
  const refresh = () => {
    console.log('刷新数据了');
    getWordInfo(curWord.value);
  };
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
        .search-icon {
          cursor: pointer;
        }
        &:hover .dropdown {
          display: block;
        }
        .dropdown {
          background: #fff;
          position: absolute;
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.208);
          width: 730px;
          top: 34px;
          left: 0;
          max-height: 600px;
          transition: max-height 2s linear;
          &-inner {
            padding: 4px;
          }
          &-option {
            max-height: 40px;
            height: 24px;
            line-height: 24px;
            color: #8a8a8a;
            cursor: pointer;
            &:hover {
              background-color: #5d80d016;
            }
            &-left,
            &-right {
              display: inline-block;
            }
            &-right {
              margin-left: 8px;
              font-size: 12px;
              color: #8a8a8aed;
            }
          }
        }
      }
      .word-content {
        width: 730px;
        min-height: calc(100vh - 138px);
        background: #fff;
      }
    }
  }
</style>
