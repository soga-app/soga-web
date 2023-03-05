<template>
  <div class="community">
    <div class="community-left">
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
              <div v-for="(item, index) in econonicCol" :key="index" class="child-category">
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
              <div v-for="(item, index) in examCol" :key="index" class="child-category">
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
              <div v-for="(item, index) in funCol" :key="index" class="child-category">
                {{ item.catergory2 }}
              </div></div
            >
          </div>
        </n-space>
      </div>
    </div>
    <div class="community-right"></div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, ref } from 'vue';
  import { Community } from '@/api/community/index.d';
  import api from '@/api';
  let econonicCol = ref<Array<Community.CommunityColumn>>([]);
  let examCol = ref<Array<Community.CommunityColumn>>([]);
  let funCol = ref<Array<Community.CommunityColumn>>([]);
  let iconName = reactive(['icon-wenzhang', 'icon-kaoshi', 'icon-yingyinqu']);
  let communityColumn = ref<Array<Community.CommunityColumn>>();

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
  });
</script>

<style lang="less" scoped>
  .community {
    display: flex;
    justify-content: center;
    padding-top: 34px;
    &-left,
    &-right {
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
      width: 550px;
      background: #fff;
    }
  }
</style>
