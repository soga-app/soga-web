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
        <book-mark-drop-down
          :options="bookMarkOptions"
          :cur-child-option="curChildOption"
          @updateChildOption="updateChildOption"
        >
          <!-- @updateDropDown="updateDropDown" -->
          <template #trigger>
            <div class="nav-right-option">收藏夹</div>
          </template>
          <template #child="{ option }">
            <div class="child-option">
              <div class="child-option-left">{{ option.info.type }}</div>
              <div class="child-option-right">
                <div class="child-option-right-up">{{ option.info.sentence }}</div>
                <div class="child-option-right-down">{{ option.info.mean }}</div>
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
  <div class="test">
    <n-space :size="10"
      ><n-button type="primary" @click="testTimeout">测试超时</n-button>
      <n-button type="primary" @click="testTimeoutRetry">测试超时会重传</n-button>
      <n-button type="primary" @click="testWrongCode">测试错误状态码</n-button>
      <n-button type="primary" @click="testWrongCodeGet">测试错误状态码-get方法</n-button>
    </n-space>
  </div>
</template>
<script lang="ts" setup>
  import api from '@/api';
  import girlImg from '@/assets/img/user/girl.png';
  import boyImg from '@/assets/img/user/boy.png';
  import { UserStore } from '@/stores';
  import { useRoute, useRouter } from 'vue-router';
  import { computed, ref, onMounted, watch } from 'vue';
  import http from '@/api/config';

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
  let bookMarkOptions = ref<Array<OptionItem>>([]);
  let curChildOption = ref<Array<ChildOptionItem>>([]);

  watch(
    () => route.name,
    (newVal, oldVal) => {
      console.log(oldVal, newVal);
      if (oldVal === 'Login' && newVal === 'HomePage') {
        initCollection();
      }
    }
  );

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

  const initCollection = async () => {
    bookMarkOptions.value = [];
    const fatherOptions = await api.collection.getCollectionList();
    // 默认展示第一个收藏夹的内容
    await updateChildOption(fatherOptions[0].id);
    fatherOptions.forEach((item, index) => {
      if (index === 0) {
        bookMarkOptions.value?.push({
          label: item.name,
          value: item.id,
          child: curChildOption.value
        });
      } else {
        bookMarkOptions.value?.push({
          label: item.name,
          value: item.id
        });
      }
    });
  };

  const updateChildOption = async (colId: number) => {
    const defaultChild = await api.collection.getCollectionFile({ colId });
    const childFirstOption = defaultChild.map((item: any) => {
      const { wordId, colId } = item;
      return { label: item.type, value: { wordId, colId }, info: { ...item } };
    });
    curChildOption.value = childFirstOption;
  };

  const testTimeout = async () => {
    const res = await http.get('http://127.0.0.1:4523/m1/2125089-0-default/error/timeout');
    console.log('执行testTimeout res is', res);
  };
  const testTimeoutRetry = async () => {
    const res = await http.get(
      'http://127.0.0.1:4523/m1/2125089-0-default/error/timeout',
      {},
      {
        retryTimes: 3
      }
    );
    console.log('执行testTimeout res is', res);
  };
  const testWrongCode = () => {
    try {
      http.post(
        'http://127.0.0.1:4523/m1/2125089-0-default/error/wrongCode',
        { id: 1 },
        { retryTimes: 3 }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  const testWrongCodeGet = () => {
    try {
      http.get(
        'http://127.0.0.1:4523/m1/2125089-0-default/error/wrongcode-get',
        { id: 1, info: [1, 2, 3] },
        { retryTimes: 3 }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
</script>
<style scoped lang="less">
  .nav_wrapper {
    padding: 0 55px 0 100px;
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
        width: 85px;
        text-align: center;
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
    width: 304px;
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
      width: 230px;
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
