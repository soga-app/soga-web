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
            <n-form ref="formInstRef" :rules="rules" :model="model">
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
            <n-button type="primary" block strong @click="login"> 登录 </n-button>
            <div class="register-link">
              没有账号？<router-link to="/signup">立即注册</router-link>
            </div>
          </n-tab-pane>
          <n-tab-pane name="login-by-verification" tab="验证码登录">
            <n-form :rules="rules" :model="model">
              <n-form-item-row path="fieldPhone">
                <n-input
                  v-model:value="model.fieldPhone"
                  placeholder="邮箱"
                  clearable
                  size="large"
                />
              </n-form-item-row>
              <n-form-item-row>
                <n-input-group>
                  <n-input :style="{ width: '85%' }" placeholder="验证码" clearable size="large" />
                  <n-button type="primary" ghost> 获取验证码 </n-button>
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
            <n-button type="primary" block strong> 登录 </n-button>
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
  import { FormInst } from 'naive-ui';
  import { Login } from '@/api';
  import { GlobalStore } from '@/stores';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const globalStore = GlobalStore();
  const formInstRef = ref<FormInst | null>(null);
  const rules = {
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
  const model = reactive({
    fieldPassword: '',
    fieldPhone: '',
    fieldUsername: ''
  });
  const login = (e: MouseEvent) => {
    e.preventDefault();
    formInstRef.value?.validate((errors) => {
      if (!errors) {
        console.log('验证通过');
        console.log(formInstRef.value);
        Login({ username: model.fieldUsername, password: model.fieldPassword }).then((res) => {
          if (res.data.code === 200) {
            console.log(res);
            window.$message.success('登录成功！');
            globalStore.setToken(res.data.data);
            router.push('./index');
          } else {
            window.$message.error('登录失败，请检查账号或密码是否正确');
          }
        });
      } else {
        console.log(errors);
      }
    });
  };
</script>

<style scoped lang="less">
  .login {
    .img-container {
      background: rgba(88, 122, 203, 0.3);
      height: 768px;
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
    width: 1366px;
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
