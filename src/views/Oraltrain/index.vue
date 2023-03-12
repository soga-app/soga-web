<template>
  <div class="content-wrap">
    <div class="body-wrap">
      <div class="scene-choose"
        ><div class="option-item"
          ><div class="option-item-text">场景选择</div
          ><n-select
            v-model:value="scene"
            :options="sceneOptions"
            @update:value="updateScene"
            @focus="showOption"
        /></div>
        <div class="option-item"
          ><div class="option-item-text">机器人角色</div
          ><n-select v-model:value="robot_role" :options="robotRoles"
        /></div>
        <div class="option-item">
          <div class="option-item-text">用户角色</div
          ><n-select v-model:value="user_role" :options="userRoles"
        /></div>
        <!-- <div class="option-btn">
          <n-button type="primary">开启会话</n-button>
        </div> -->
      </div>
      <div class="scene-dialog">
        <div
          v-for="(item, index) in conversation"
          :key="index"
          :class="`dialog-item ${item.role === 'user' ? 'item-user' : 'item-robot'}`"
        >
          <n-popover placement="top-start">
            <template #trigger>
              <div class="text">
                <div v-if="!item.originContent" class="text-loading">
                  <ball-loading :ball-color="item.role === 'user' ? '#fc2f70' : '#3f33e7'" />
                </div>
                <div v-else class="text-show">{{ item.originContent }}</div>
                <div v-show="item.transContent" class="text-trans">{{ item.transContent }}</div>
              </div>
            </template>
            <n-button quaternary type="info"> 语音播放 </n-button>
            <n-button quaternary type="info" @click="showTrans(index)"> 翻译 </n-button>
            <n-button
              quaternary
              type="info"
              @click="copy(`${item.originContent}\n${item.transContent}`)"
            >
              复制文本
            </n-button>
          </n-popover>
          <div class="head-pic"
            ><img
              :src="
                item.role === 'robot' ? robotImg : userStore.getGender === '男' ? boyImg : girlImg
              "
            />
          </div>
        </div>
      </div>
      <div class="scene-input">
        <n-input
          v-model:value="user_text"
          class="scene-input-self"
          placeholder="请输入对话语句"
          @keyup.enter="generateConversation"
        >
        </n-input>
        <n-button type="primary" :disabled="!generateBtnShow" @click="generateConversation"
          >生成回答</n-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import girlImg from '@/assets/img/user/girl.png';
  import boyImg from '@/assets/img/user/boy.png';
  import { UserStore } from '@/stores';
  import robotImg from '@/assets/img/oraltrain/robot.png';
  import { ref, onMounted, computed, watch } from 'vue';
  import api from '@/api';
  import useClipboard from 'vue-clipboard3';

  interface ConversationItem {
    role: string;
    originContent: string;
    transContent?: string;
    audio: string;
    scene: string;
    userRole: string;
    robotRole: string;
  }
  const conversation = ref<Array<ConversationItem>>([]);

  const userStore = UserStore();
  //   '机场', '餐厅', '公交车', '购物中心'
  let sceneOptions_raw = [
    { label: '机场', value: '机场', type: [1] },
    { label: '餐厅', value: '餐厅', type: [2] },
    { label: '公交车', value: '公交车', type: [3] },
    { label: '购物中心', value: '购物中心', type: [4] }
  ];
  let robotRoles_raw = [
    { label: '空姐', value: '空姐', type: [1] },
    { label: '服务员', value: '服务员', type: [2] },
    { label: '司机', value: '司机', type: [3] },
    { label: '导购员', value: '导购员', type: [4] }
  ];
  let userRoles_raw = [
    { label: '乘客', value: '乘客', type: [1, 3] },
    { label: '食客', value: '食客', type: [2] },
    { label: '顾客', value: '顾客', type: [4] }
  ];
  let sceneOptions = ref();
  let robotRoles = ref();
  let userRoles = ref();
  let scene = ref('');
  let user_role = ref('');
  let robot_role = ref('');
  let user_text = ref('');
  let generateBtnShow = ref(true);

  onMounted(() => {
    init();
  });

  const isSceneSet = computed(() => scene.value && user_role.value && robot_role);

  watch(isSceneSet, () => {
    conversation.value = [];
    if (isSceneSet.value) {
      conversation.value.push({
        role: 'robot',
        originContent:
          '親愛なるマスター、SOGA日本語の情景口語練習基地へようこそ、下の入力ボックスに文を入力してアンドロイドとの会話を始めてください！',
        scene: scene.value,
        userRole: user_role.value,
        robotRole: robot_role.value,
        audio: '',
        transContent: ''
      });
    }
  });

  const init = () => {
    sceneOptions.value = sceneOptions_raw;
    robotRoles.value = robotRoles_raw;
    userRoles.value = userRoles_raw;
  };

  const updateScene = (val: any) => {
    const index = sceneOptions.value.findIndex((item: any) => item.value === val);
    const type = sceneOptions.value[index].type;
    console.log(index, type);
    robotRoles.value = robotRoles.value.filter((item: any) =>
      item.type.some((i: any) => type.includes(i))
    );
    userRoles.value = userRoles.value.filter((item: any) =>
      item.type.some((i: any) => type.includes(i))
    );
  };

  const showOption = () => {
    init();
    user_role.value = '';
    robot_role.value = '';
  };

  const generateConversation = async () => {
    if (!isSceneSet.value) {
      window.$message.warning('请先选好对话场景哦！');
      return;
    } else {
      generateBtnShow.value = false;
      conversation.value.push({
        role: 'user',
        originContent: user_text.value,
        scene: scene.value,
        userRole: user_role.value,
        robotRole: robot_role.value,
        audio: '',
        transContent: ''
      });
      conversation.value.push({
        role: 'robot',
        originContent: '',
        scene: scene.value,
        userRole: user_role.value,
        robotRole: robot_role.value,
        audio: '',
        transContent: ''
      });
      const res = await api.oraltrain.getChatgptResponse({
        scene: scene.value,
        user_role: user_role.value,
        robot_role: robot_role.value,
        user_text: user_text.value
      });
      conversation.value[conversation.value.length - 1].originContent = res;
      generateBtnShow.value = true;
      user_text.value = '';
    }
  };

  const showTrans = (index: number) => {
    if (index === 0) {
      conversation.value[0].transContent =
        '亲爱的小主，欢迎来到SOGA日语的情景口语练习基地，请在下方的输入框输入语句开始与智能机器人的对话吧！';
    }
  };

  const { toClipboard } = useClipboard();
  const copy = async (copyText: string) => {
    try {
      await toClipboard(copyText);
      window.$message.success(
        `${copyText.slice(0, 40)}${copyText.length > 40 ? '...' : ''}已经成功复制到您的粘贴板！`
      );
    } catch (e) {
      console.error(e);
    }
    return { copy };
  };
</script>

<style lang="less" scoped>
  .content-wrap {
    padding-top: 34px;
    width: 700px;
    height: 570px;
    margin: 0 auto;
    .body-wrap {
      background: #fff;
      width: 100%;
      height: 100%;
      padding: 16px;
      position: relative;
      .scene-choose {
        display: flex;
        justify-content: flex-end;
        .option-item {
          width: 150px;
          display: flex;
          align-items: center;
          margin-right: 10px;
          &-text {
            color: #8a8a8a;
            width: 108px;
            font-size: 12px;
          }
        }
      }
      .scene-dialog {
        padding: 24px;
        max-height: 420px;
        overflow-y: auto;
        margin: 10px auto;
        .dialog-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .head-pic > img {
            width: 42px;
            height: 42px;
          }
          .text {
            max-width: 386px;
            color: #8a8a8a;
            font-size: 12px;
            padding: 8px 16px;
            border-radius: 6px;
            margin: 0 8px;
            &-trans {
              border-top: 1px dashed #8a8a8a;
            }
          }
        }
        .item-robot {
          justify-content: flex-end;
          flex-direction: row-reverse;
          .text {
            background: #bcccf360;
            position: relative;
            &::before {
              position: absolute;
              width: 0;
              height: 0;
              content: '';
              border: 7px solid transparent;
              border-right: 6px solid #bcccf360;
              top: 20%;
              left: -12px;
            }
          }
        }
        .item-user {
          justify-content: flex-end;
          .text {
            background: #f6b8cc90;
            position: relative;
            &::after {
              position: absolute;
              width: 0;
              height: 0;
              content: '';
              border: 7px solid transparent;
              border-left: 6px solid #f6b8cc90;
              top: 20%;
              right: -12px;
            }
          }
        }
      }
      .scene-input {
        display: flex;
        position: absolute;
        bottom: 16px;
        width: 668px;
        margin-left: 12px;
        justify-content: center;
      }
    }
  }
</style>
