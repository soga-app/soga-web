<template>
  <div class="community">
    <div v-if="!showTrans" class="community-left">
      <div class="community-left-content">
        <n-space :size="30" vertical>
          <div class="category">
            <div class="title">
              <div class="title-img"
                ><svg-icon :name="iconName[0]" font-size="36px" color="#587acb" />
              </div>
              <div class="title-text">中日双语对照新闻</div>
            </div>
            <div class="category2">
              <div
                v-for="(item, index) in econonicCol"
                :key="index"
                class="child-category"
                @click="chooseCatergory2(item)"
              >
                {{ item.catergory2 }}
              </div>
            </div>
          </div>
          <div class="category">
            <div class="title">
              <div class="title-img"
                ><svg-icon :name="iconName[1]" font-size="36px" color="#587acb" />
              </div>
              <div class="title-text">日本等级考试N1~N5</div>
            </div>
            <div class="category2">
              <div
                v-for="(item, index) in examCol"
                :key="index"
                class="child-category"
                @click="chooseCatergory2(item)"
              >
                {{ item.catergory2 }}
              </div></div
            >
          </div>
          <div class="category">
            <div class="title">
              <div class="title-img"
                ><svg-icon :name="iconName[2]" font-size="36px" color="#587acb" />
              </div>
              <div class="title-text">娱乐影音</div>
            </div>
            <div class="category2">
              <div
                v-for="(item, index) in funCol"
                :key="index"
                class="child-category"
                @click="chooseCatergory2(item)"
              >
                {{ item.catergory2 }}
              </div></div
            >
          </div>
        </n-space>
      </div>
    </div>
    <div class="community-right">
      <div v-if="!showPassage">
        <div v-if="introInfo" class="column-intro">
          <div class="column-intro-left">
            <img :src="introInfo.card" alt="" />
          </div>
          <div class="column-intro-right">
            <div class="column-intro-right-name">{{ introInfo.catergory2 }}</div>
            <div class="column-intro-right-introduction">{{
              introInfo.catergory2Introduction
            }}</div>
          </div>
        </div>
        <list-loading v-else :has-padding="true" />
        <div v-if="curPassageList.length" class="column-passage">
          <div
            v-for="item in curPassageList"
            :key="item.passageTitle"
            class="column-passage-item"
            @click="goToPassage(item)"
          >
            {{ item.passageTitle }}</div
          >
          <div class="pagination-style">
            <n-pagination v-model:page="pageNum" :page-count="pageCount" @update:page="pageChange"
          /></div>
        </div>
        <list-loading v-else :row="2" :has-padding="true" />
      </div>
      <div v-else class="passage">
        <div class="passage-operation">
          <n-tooltip trigger="hover">
            <template #trigger>
              <span>
                <svg-icon
                  style="margin-right: 16px"
                  name="icon-shuyi_fanyi-105"
                  font-size="20px"
                  hover-color="#587acb"
                  @click="showTransPassage"
              /></span>
            </template>
            日语译文
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <span>
                <svg-icon
                  name="icon-xiazai"
                  font-size="20px"
                  hover-color="#587acb"
                  @click="downloadPdf(curPassage.title)"
              /></span>
            </template>
            下载文章pdf
          </n-tooltip>
        </div>
        <div id="pdfcontent">
          <div class="passage-title">{{ curPassage?.title }}</div>
          <div class="passage-content" v-html="curPassage.content"></div
        ></div>
      </div>
      <div v-if="showTrans" class="passage">
        <!-- <div class="passage-title">{{ curPassage?.title }}</div> -->
        <div class="passage-content" v-html="curPassage.trans"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, ref } from 'vue';
  import { Community } from '@/api/community/index.d';
  import api from '@/api';
  import { useRouter } from 'vue-router';
  import ExportSavePdf from '@/util/html2pdf';

  interface PassageContent {
    title: string;
    content: string;
    trans: string;
  }

  const router = useRouter();
  let econonicCol = ref<Array<Community.CommunityColumn>>([]);
  let examCol = ref<Array<Community.CommunityColumn>>([]);
  let funCol = ref<Array<Community.CommunityColumn>>([]);
  let iconName = reactive(['icon-wenzhang', 'icon-kaoshi', 'icon-yingyinqu']);
  let communityColumn = ref<Array<Community.CommunityColumn>>();
  let introInfo = ref();
  let curPassageList = ref<Array<Community.PassageItem>>([]);
  let pageNum = ref(1);
  let showPassage = ref(false);
  let pageCount = ref(0);
  let curPassage = ref<PassageContent>({ title: '', content: '', trans: '' });
  let showTrans = ref(false);

  onMounted(async () => {
    communityColumn.value = await api.community.getCommunityList();
    communityColumn.value.forEach((item) => {
      switch (item.catergory1) {
        case '中日双语对照新闻':
          econonicCol.value.push(item);
          break;
        case '日本等级考试N1~N5':
          examCol.value.push(item);
          break;
        case '娱乐影音':
          funCol.value.push(item);
          break;
        default:
          break;
      }
    });
    introInfo.value = communityColumn.value[0];
    changeCurPassageList(1);
  });
  const changeCurPassageList = async (page: number) => {
    curPassageList.value = [];
    const { catergory2 } = introInfo.value;
    const {
      communityContentList: { records, total }
    } = await api.community.getPassageListByName({ catergory2, page, size: 10 });
    curPassageList.value = records;
    pageCount.value = Math.ceil(total / 10);
  };
  const chooseCatergory2 = (intro: any) => {
    showPassage.value = false;

    introInfo.value = intro;
    pageNum.value = 1;
    changeCurPassageList(1);
  };

  const goToPassage = (item: Community.PassageItem) => {
    //说明文章是文件形式不是字符串形式
    if (item.passageContent.startsWith('http')) {
      // router.push({ name: 'CommunityContent' });
      let oA = document.createElement('a');
      oA.download = item.passageContent.replace('http://43.139.46.117:8083/', '');
      oA.href = item.passageContent;
      oA.click();
      console.log('OA is', oA);
    } else {
      showPassage.value = true;
      curPassage.value.title = item.passageTitle;
      curPassage.value.content = item.passageContent;
      curPassage.value.trans = item.translate;
    }
  };

  const pageChange = (page: number) => {
    pageNum.value = page;
    changeCurPassageList(page);
  };

  const showTransPassage = () => {
    showTrans.value = !showTrans.value;
  };

  const downloadPdf = (name: string) => {
    // const time = moment().format('YYYY年MM月D日');
    window.$message.info('开始下载文档');
    const d = new Date();
    ExportSavePdf('pdfcontent', name.substring(0, 15), d.getMonth() + d.getDate());
  };
</script>

<style lang="less" scoped>
  .community {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    &-left {
      width: 400px;
    }
    &-left {
      background: #cfd8ef;
      &-content {
        padding: 48px 30px;
        .category {
          background: #fff;
          padding: 16px;
          .title {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            &-img {
              margin-right: 8px;
            }
          }
          .category2 {
            margin-top: 16px;
            display: flex;
            flex-wrap: wrap;
            cursor: pointer;
            font-size: 14px;
            color: #8a8a8a;
            .child-category {
              margin-right: 8px;
              padding-right: 8px;
              border-right: 1px solid #8a8a8a;
              margin-bottom: 6px;
            }
          }
        }
      }
    }
    &-right {
      display: flex;
      background: #fff;
      padding: 16px;
      max-height: 600px;
      min-width: 500px;
      .column-intro {
        display: flex;
        &-left {
          margin-right: 20px;
          img {
            width: 120px;
            height: 120px;
          }
        }
        &-right {
          &-name {
            margin-top: 18px;
            font-size: 22px;
            font-family: Noto Sans SC-Bold, Noto Sans SC;
            font-weight: bold;
            color: #8a8a8a;
            line-height: 26px;
          }
          &-introduction {
            margin-top: 16px;
            font-size: 16px;
            font-family: Noto Sans SC-Regular, Noto Sans SC;
            font-weight: 400;
            color: #8a8a8a;
          }
        }
      }
      .column-passage {
        &-item {
          height: 36px;
          border-bottom: 1px dashed #d5cfcf;
          cursor: pointer;
          line-height: 36px;
          color: #8a8a8a;
          font-size: 14px;
          &:hover {
            background: #d9e2f665;
          }
        }
      }
    }
    .pagination-style {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
    .passage {
      width: 520px;
      background: #fff;
      max-height: 600px;
      overflow-y: auto;
      padding: 16px;
      &-operation {
        display: flex;
        justify-content: flex-end;
      }
      &-title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #8a8a8a;
      }
      &-content {
        color: #8a8a8a;
      }
    }
    .passage:nth-child(2) {
      padding-top: 46px;
    }
  }
</style>
