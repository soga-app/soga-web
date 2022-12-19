<template>
    <div class="signup">
        <div class="card-container">
            <n-card size="small">
                <img class="img" src="../../assets/img/qrcode.png" alt="二维码" />
                <n-tabs default-value="signup" size="large" justify-content="space-evenly">
                    <n-tab-pane name="signup" tab="注册">
                        <n-form :ref="formInstRef" :rules="rules" :model="model">
                            <n-radio-group v-model:value="gender" name="radiogroup">
                                <n-space justify="space-around" class="radio-space">
                                    <span>性别</span>
                                    <n-radio key="0" value="0"> 男 </n-radio>
                                    <n-radio key="1" value="1"> 女 </n-radio>
                                </n-space>
                            </n-radio-group>
                            <n-form-item-row path="fieldUsername">
                                <n-input
                                    v-model:value="model.fieldUsername"
                                    placeholder="账号"
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
                            <n-form-item-row path="fieldPhone">
                                <n-input
                                    v-model:value="model.fieldPhone"
                                    placeholder="手机号"
                                    clearable
                                    size="large"
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
                        <n-button type="primary" block strong> 立即注册 </n-button>
                        <div class="register-link"> 已有账号？<a href="">立即登录</a> </div>
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </div>
        <div class="img-container">
            <div class="background">
                <div class="communication-img"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { FormInst } from 'naive-ui';
    const formInstRef = ref<FormInst | null>(null);
    const rules = {
        fieldPassword: {
            required: true,
            message: '密码需要输入6到12位，需出现字母和数字两种符号',
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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
            message: '请输入3到12位由中文，英文字母，或者数字组成的用户名',
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/,
            trigger: ['input', 'blur']
        }
    };
    const model = ref({
        fieldPassword: '',
        fieldPhone: '',
        fieldUsername: ''
    });
    const gender = ref('');
</script>

<style scoped lang="less">
    .signup {
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
                .radio-space {
                    width: 400px;
                }
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
