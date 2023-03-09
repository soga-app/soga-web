<template>
  <div class="update-password">
    <div class="body-wrap">
      <div class="title">更改密码</div>
      <n-form ref="formRef" :rules="rules" :model="model">
        <n-form-item-row path="fieldOldPassword">
          <n-input
            v-model:value="model.fieldOldPassword"
            type="password"
            show-password-on="click"
            placeholder="请输入旧密码"
            clearable
            size="large"
          />
        </n-form-item-row>
        <n-form-item-row path="fieldNewPassword1">
          <n-input
            v-model:value="model.fieldNewPassword1"
            type="password"
            show-password-on="click"
            placeholder="请输入新密码"
            clearable
            size="large"
          />
        </n-form-item-row>
        <n-form-item-row path="fieldNewPassword2">
          <n-input
            v-model:value="model.fieldNewPassword2"
            type="password"
            show-password-on="click"
            placeholder="请再次输入新密码"
            clearable
            size="large"
          />
        </n-form-item-row>
      </n-form>
      <n-button style="margin-top: 180px" type="primary" block strong @click="updatePassword">
        修改
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import api from '@/api';
  import { ref, reactive } from 'vue';
  import { FormInst, logDark } from 'naive-ui';
  const formRef = ref<FormInst | null>(null);
  const rules = {
    fieldOldPassword: {
      required: true,
      message: '密码需要输入6到12位，需出现字母和数字两种符号',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      trigger: ['input', 'blur']
    },
    fieldNewPassword1: {
      required: true,
      message: '新密码需要输入6到12位，需出现字母和数字两种符号',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      trigger: ['input', 'blur']
    },
    fieldNewPassword2: {
      required: true,
      message: '新密码需要输入6到12位，需出现字母和数字两种符号',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      trigger: ['input', 'blur']
    }
  };
  const model = reactive({
    fieldNewPassword2: '',
    fieldNewPassword1: '',
    fieldOldPassword: ''
  });
  function updatePassword(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
      if (!errors) {
        try {
          const res = await api.user.validatePassword({
            password: model.fieldOldPassword
          });
          if (model.fieldNewPassword2 === model.fieldNewPassword1) {
            await api.user.updatePassword({
              password: model.fieldNewPassword1
            });
            window.$message.success('更改成功！');
          } else {
            window.$message.error('新密码输入不一致');
          }
        } catch (error) {
          window.$message.error('旧密码输入不正确');
        }
      } else {
        console.log(errors);
      }
    });
  }
</script>

<style scoped lang="less">
  .update-password {
    padding-top: 34px;
    .title {
      text-align: center;
      font-size: 18px;
      color: #587acb;
    }
    .body-wrap {
      width: 420px;
      height: 520px;
      background: #fff;
      margin: auto;
      padding: 24px;
    }
  }
</style>
