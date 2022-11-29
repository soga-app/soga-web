<template>
    <n-message-provider>
        <n-dialog-provider>
            <Message />
        </n-dialog-provider>
    </n-message-provider>
    <router-view />
</template>

<script setup lang="ts">
    import { NMessageProvider, NDialogProvider } from 'naive-ui';
    import Message from '@/components/Message.vue';
</script>

<style scoped></style>
