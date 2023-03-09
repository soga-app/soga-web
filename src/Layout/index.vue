<template>
  <div v-if="!hideNav" class="nav nav_wrapper">
    <div class="nav-left">
      <div class="nav-left-logo" @click="goTo('homePage')"
        ><img
          src="../assets/logo1.png"
          alt=""
          style="width: 112px; height: 40px; margin-top: 6px"
        />
      </div>
    </div>
    <div class="nav-right">
      <n-space :size="38" align="center">
        <div>
          <div v-if="!userStore.getToken" class="nav-right-option" @click="goTo('regLogin')"
            >登录/注册</div
          >
          <div v-else class="head-pic">
            <n-dropdown trigger="hover" :options="options" @select="handleSelect">
              <img
                :src="userStore.getGender === '男' ? boyImg : girlImg"
                alt=""
                style="width: 48px; height: 48px; margin-top: 6px"
              />
            </n-dropdown>
          </div>
        </div>
        <div class="nav-right-option" @click="goTo('userCenter')">个人中心</div>
        <!-- <div class="nav-right-option">足迹</div> -->
        <book-mark-drop-down :options="bookMarkOptions">
          <template #trigger>
            <div class="nav-right-option">足迹</div>
          </template>
          <template #child="{ option }">
            <div class="child-option">
              <div class="child-option-left">{{ option.info.type }}</div>
              <div class="child-option-right">
                <div class="child-option-right-up">{{ option.info.japan }}</div>
                <div class="child-option-right-down">{{ option.info.chinese }}</div>
              </div>
            </div>
          </template>
        </book-mark-drop-down>
      </n-space>
    </div>
  </div>
  <div class="content-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>
<script lang="ts" setup>
  import api from '@/api';
  import girlImg from '@/assets/img/user/girl.png';
  import boyImg from '@/assets/img/user/boy.png';
  import { UserStore } from '@/stores';
  import { useRoute, useRouter } from 'vue-router';
  import { computed, reactive } from 'vue';
  const route = useRoute();
  const router = useRouter();
  const userStore = UserStore();
  let hideNav = computed(() => {
    return route.meta.hideNav;
  });
  let options = [
    {
      label: '退出登录',
      key: 'logout'
    },
    {
      label: '修改信息',
      key: 'changeInformation'
    },
    {
      label: '修改密码',
      key: 'changePassword'
    }
  ];
  let bookMarkOptions = reactive([
    {
      label: '收藏夹1',
      value: '001',
      child: [
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章2',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        }
      ]
    },
    {
      label: '收藏夹2',
      value: '002',
      child: [
        {
          label: '文章4',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你11',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章5',
          value: 'passage2',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你22',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你33',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你55',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        }
      ]
    },
    {
      label: '收藏夹3',
      value: '001',
      child: [
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你99',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你98',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你97',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        },
        {
          label: '文章1',
          value: 'passage1',
          info: {
            type: '单词',
            chinese: '短时间内官方SDK交给你',
            japan: '彼は逃げるためにありとあらゆる手段を捜した。'
          }
        }
      ]
    }
  ]);
  function handleSelect(key: string | number) {
    switch (key) {
      case 'logout':
        api.user.logout();
        window.localStorage.clear();
        router.push({ name: 'Login' });
        break;
      case 'changeInformation':
        router.push({ name: 'UpdateInformation' });
        break;
      case 'changePassword':
        router.push({ name: 'UpdatePassword' });
    }
  }
  function goTo(curPath: string) {
    switch (curPath) {
      case 'regLogin':
        router.push({ name: 'Login' });
        break;
      case 'userCenter':
        router.push({ name: 'UserCenter' });
        break;
      case 'homePage':
        router.push({ name: 'HomePage' });
    }
  }
</script>
<style scoped lang="less">
  .nav_wrapper {
    padding: 0 100px 0 100px;
    height: 54px;
    background: #587acb;
    box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    color: #fff;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      &-logo {
        cursor: pointer;
      }
    }
    &-right {
      display: flex;
      margin-right: 94px;
      &-option {
        height: 54px;
        font-size: 16px;
        font-weight: bold;
        line-height: 54px;
        cursor: pointer;
      }
    }
  }
  .child-option {
    display: flex;
    width: 318px;
    height: 50px;
    align-items: center;
    &-left {
      border: 1px solid #6787d2;
      border-radius: 4px;
      color: #6787d2;
      width: 40px;
      height: 30px;
      line-height: 30px;
      margin-right: 8px;
      text-align: center;
    }
    &-right {
      width: 240px;
      &-up {
        max-width: 220px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        overflow: hidden;
      }
      &-down {
        overflow: hidden;
        max-width: 190px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
      }
    }
  }
</style>

<style lang="less">
  // 导航栏下的全局样式
  .content-wrapper {
    min-height: calc(100vh - 53px);
    background: rgba(242, 242, 242, 0.8);
  }
</style>
