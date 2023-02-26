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
        <div class="nav-right-option">足迹</div>
        <!-- <book-mark-drop-down><div class="nav-right-option">足迹</div></book-mark-drop-down> -->
      </n-space>
    </div>
  </div>
  <div class="content-wrapper"><router-view></router-view> </div>
</template>
<script lang="ts" setup>
  import api from '@/api';
  import girlImg from '@/assets/img/user/girl.png';
  import boyImg from '@/assets/img/user/boy.png';
  import { UserStore } from '@/stores';
  import { useRoute, useRouter } from 'vue-router';
  import { computed } from 'vue';
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
      &-option {
        height: 54px;
        font-size: 16px;
        font-weight: bold;
        line-height: 54px;
        cursor: pointer;
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
