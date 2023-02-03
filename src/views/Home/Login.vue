<template>
  <div class="login">
    <div class="img-container">
      <div class="background">
        <div class="communication-img"></div>
      </div>
    </div>
    <div class="card-container">
      <n-card :bordered="false" size="small">
        <img class="img" src="../../assets/img/qrcode.png" alt="二维码" />
        <n-tabs default-value="login-by-password" size="large" justify-content="space-evenly">
          <n-tab-pane name="login-by-password" tab="密码登录">
            <n-form ref="accountFormInstRef" :rules="rules" :model="model">
              <n-form-item-row path="fieldUsername">
                <n-input
                  v-model:value="model.fieldUsername"
                  placeholder="手机号/账号"
                  clearable
                  size="large"
                />
              </n-form-item-row>
              <n-form-item-row path="fieldPassword">
                <n-input
                  v-model:value="model.fieldPassword"
                  size="large"
                  clearable
                  type="password"
                  show-password-on="click"
                  placeholder="密码"
                />
              </n-form-item-row>
            </n-form>
            <n-button
              class="forget-password"
              size="tiny"
              text
              tag="a"
              href="https://anyway.fm/news.php"
              target="_blank"
              type="primary"
            >
              忘记密码
            </n-button>
            <n-button type="primary" block strong @click="loginWithPwd"> 登录 </n-button>
            <div class="register-link">
              没有账号？<router-link to="/signup">立即注册</router-link>
            </div>
          </n-tab-pane>
          <n-tab-pane name="login-by-verification" tab="验证码登录">
            <n-form ref="emailFormInstRef" :rules="rules" :model="model">
              <n-form-item-row path="fieldEmail">
                <n-input
                  v-model:value="model.fieldEmail"
                  placeholder="邮箱"
                  clearable
                  size="large"
                />
              </n-form-item-row>
              <n-form-item-row>
                <n-input-group>
                  <n-input
                    v-model:value="model.fieldVerifyCode"
                    :style="{ width: '85%' }"
                    placeholder="验证码"
                    clearable
                    size="large"
                  />
                  <n-button
                    type="primary"
                    ghost
                    :disabled="countdownFlag === 1"
                    @click="emailValidate"
                  >
                    <span v-if="!countdownFlag">获取验证码</span>
                    <span v-else style="font-variant-numeric: tabular-nums">
                      <n-countdown
                        :render="renderCountdown"
                        :duration="120 * 1000"
                        :active="countdownFlag === 1"
                      />
                    </span>
                  </n-button>
                </n-input-group>
              </n-form-item-row>
            </n-form>
            <n-button
              class="forget-password"
              size="tiny"
              text
              tag="a"
              href="https://anyway.fm/news.php"
              target="_blank"
              type="primary"
            >
              忘记密码
            </n-button>
            <n-button type="primary" block strong @click="loginWithEmail">
              <span>登录</span>
            </n-button>
            <div class="register-link">
              没有账号？<router-link to="/signup"> 立即注册</router-link>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { FormInst, CountdownProps } from 'naive-ui';
  import api from '@/api';
  import { UserStore } from '@/stores';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const userStore = UserStore();
  let countdownFlag = ref(0);

  const accountFormInstRef = ref<FormInst | null>(null);
  const emailFormInstRef = ref<FormInst | null>(null);
  const rules = {
    fieldEmail: {
      required: true,
      message: '请正确输入邮箱',
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      trigger: ['input', 'blur']
    },
    fieldPassword: {
      required: true,
      message: '密码需要输入6到12位，需出现字母和数字两种符号',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      trigger: ['input', 'blur']
    },
    fieldPhone: {
      required: true,
      message: '请正确输入手机号',
      pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      trigger: ['input', 'blur']
    },
    fieldUsername: {
      required: true,
      message: '请正确输入手机号或者用户名',
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$|^[1][3,4,5,7,8][0-9]{9}$/,
      trigger: ['input', 'blur']
    },
    fieldVerification: {
      required: true,
      message: '请正确输入验证码',
      pattern: /^\d{6}$/,
      trigger: ['input', 'blur']
    }
  };
  const renderCountdown: CountdownProps['render'] = ({ minutes, seconds }) => {
    return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const model = reactive({
    fieldPassword: '',
    fieldPhone: '',
    fieldUsername: '',
    fieldEmail: '',
    fieldVerifyCode: ''
  });
  const countDown = () => {
    countdownFlag.value = 1;
    setTimeout(() => {
      countdownFlag.value = 0;
    }, 120000);
  };
  const emailValidate = (e: MouseEvent) => {
    e.preventDefault();
    emailFormInstRef.value?.validate(async (errors) => {
      if (!errors) {
        try {
          await api.user.sendToEmail({
            email: model.fieldEmail
          });
          await countDown();
          window.$message.success('发送成功，请在120秒内完成验证');
        } catch (error) {}
      } else {
        console.log(errors);
      }
    });
  };
  const loginWithPwd = (e: MouseEvent) => {
    e.preventDefault();
    accountFormInstRef.value?.validate(async (errors) => {
      if (!errors) {
        try {
          const res = await api.user.login({
            username: model.fieldUsername,
            password: model.fieldPassword
          });
          window.$message.success('登录成功！');
          getHasLearningWordPlan();
          userStore.setToken(res.token);
          userStore.setUserInfo(res.user);
          router.push('./index');
        } catch (error) {}
      } else {
        console.log(errors);
      }
    });
  };
  const loginWithEmail = (e: MouseEvent) => {
    e.preventDefault();
    emailFormInstRef.value?.validate(async (errors) => {
      if (!errors) {
        try {
          const res = await api.user.login({
            email: model.fieldEmail,
            verifyCode: model.fieldVerifyCode
          });
          window.$message.success('登录成功！');
          getHasLearningWordPlan();
          userStore.setToken(res.token);
          userStore.setUserInfo(res.user);
          router.push('./index');
        } catch (error) {}
      } else {
        console.log(errors);
      }
    });
  };
  const getHasLearningWordPlan = async () => {
    const res = await api.dictionary.getCurPlan();
    if (!res.length) {
      userStore.setHasLearningWordPlan(false);
    } else {
      userStore.setHasLearningWordPlan(true);
    }
    console.log('res is', res);
  };
</script>

<style scoped lang="less">
  .login {
    .img-container {
      background: rgba(88, 122, 203, 0.3);
      .background {
        position: relative;
        top: 94px;
        left: 99px;
        width: 484px;
        height: 580px;
        background: url('../../assets/img/background.png');
        .communication-img {
          background: url('../../assets/img/communication.png');
          width: 400px;
          height: 352px;
          position: relative;
          top: 84px;
          left: 11px;
        }
      }
    }
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    .img-container {
      flex: 1;
    }
    .card-container {
      flex: 1;
      .n-card {
        margin: 100px 0 0 150px;
        width: 450px;
        .n-input {
          border-radius: 10px 10px 10px 10px;
          box-shadow: 0 4px 4px 0 rgba(192, 192, 192, 0.25);
        }
        .n-button {
          border-radius: 10px 10px 10px 10px;
          height: 40px;
          font-size: 16px;
          font-family: Noto Sans SC-Regular, Noto Sans SC;
          font-weight: 400;
          box-shadow: 0 4px 4px 0 rgba(192, 192, 192, 0.25);
        }
        .forget-password {
          width: 50px;
          height: 26px;
          font-size: 14px;
          font-weight: 400;
          color: #8a8a8a;
          line-height: 21px;
          box-shadow: 0 0 0 0;
          float: right;
          margin-bottom: 10px;
          transform: translateY(-8px) translateX(-10px);
        }
        img {
          width: 75px;
          float: right;
        }
      }
    }
  }

  .register-link {
    text-align: center;
    padding-top: 20px;
    a {
      text-decoration: none;
    }
    a:link {
      color: #a7b6e3;
    }
  }
</style>
