<template>
  <div class="updateInfo">
    <div class="body-wrap">
      <div class="title">更改个人信息</div>
      <n-form ref="formRef" :rules="rules" :model="model">
        <n-form-item-row path="fieldUsername">
          <n-input
            v-model:value="model.fieldUsername"
            placeholder="用户名"
            clearable
            size="large"
          />
        </n-form-item-row>
        <n-form-item-row path="fieldPhone">
          <n-input v-model:value="model.fieldPhone" placeholder="电话" clearable size="large" />
        </n-form-item-row>
        <n-form-item-row path="fieldEmail">
          <n-input v-model:value="model.fieldEmail" placeholder="邮箱" clearable size="large" />
        </n-form-item-row>
        <n-form-item-row path="fieldGender">
          <n-radio-group v-model:value="model.fieldGender" name="radiogroup">
            <n-space justify="space-around" class="radio-space">
              <span>性别</span>
              <n-radio key="0" value="男"> 男 </n-radio>
              <n-radio key="1" value="女"> 女 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-row>
        <n-form-item-row path="fieldAge">
          <n-input v-model:value="model.fieldAge" placeholder="年龄" clearable size="large" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block strong @click="changeInfo"> 修改 </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import api from '@/api';
  import { ref, reactive } from 'vue';
  import { FormInst, logDark } from 'naive-ui';
  const formRef = ref<FormInst | null>(null);
  const rules = {
    fieldPhone: {
      required: true,
      message: '请正确输入手机号',
      pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      trigger: ['input', 'blur']
    },
    fieldUsername: {
      required: true,
      message: '请正确输入用户名',
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/,
      trigger: ['input', 'blur']
    },
    fieldPassword: {
      required: true,
      message: '密码需要输入6到12位，需出现字母和数字两种符号',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      trigger: ['input', 'blur']
    },
    fieldEmail: {
      required: true,
      message: '请正确输入邮箱',
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      trigger: ['input', 'blur']
    },
    fieldGender: {
      required: true,
      message: '请正确输入`男`或者 `女`',
      pattern: /^(男|女)$/,
      trigger: ['input', 'blur']
    },
    fieldAge: {
      required: true,
      message: '请正确输入`男`或者 `女`',
      pattern: /^(?:[1-9]?\d|100)$/,
      trigger: ['input', 'blur']
    }
  };
  const UserInfo = await api.user.select().then((res) => res.user);
  const model = reactive({
    fieldPhone: UserInfo.phone,
    fieldUsername: UserInfo.name,
    fieldEmail: UserInfo.email,
    fieldAge: UserInfo.age,
    fieldGender: UserInfo.gender
  });
  function changeInfo(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
      if (!errors) {
        try {
          const res = await api.user.update({
            name: model.fieldUsername,
            age: model.fieldAge,
            gender: model.fieldGender,
            email: model.fieldEmail,
            phone: model.fieldPhone
          });
          window.$message.success('修改成功！');
        } catch (error) {}
      } else {
        console.log(errors);
      }
    });
  }
</script>

<style scoped lang="less">
  .updateInfo {
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
