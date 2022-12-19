<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <n-dialog-provider>
                <Message />
            </n-dialog-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
    import { NMessageProvider, NDialogProvider, NConfigProvider } from 'naive-ui';
    import Message from '@/components/Message.vue';
    import themeOverrides from '../theme';
</script>

<style scoped></style>
