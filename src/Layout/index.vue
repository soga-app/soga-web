<template>
  <div v-if="!hideNav" class="nav nav_wrapper">
    <div class="nav-left">
      <div class="nav-left-logo" @click="goTo('homePage')"
        ><img src="../assets/logo.png" alt="" style="width: 112px; height: 65px" />
      </div>
    </div>
    <div class="nav-right">
      <n-space :size="38">
        <div class="nav-right-option" @click="goTo('regLogin')">登录/注册</div>
        <div class="nav-right-option" @click="goTo('userCenter')">个人中心</div>
        <div class="nav-right-option">足迹</div>
      </n-space>
    </div>
  </div>
  <div class="content-wrapper"><router-view></router-view> </div>
</template>
<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import { computed } from 'vue';
  const route = useRoute();
  const router = useRouter();

  let hideNav = computed(() => {
    return route.meta.hideNav;
  });

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
    height: 65px;
    background: #587acb;
    box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
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
        font-size: 16px;
        font-weight: bold;
        line-height: 21px;
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
