<template>
    <div>
        <router-view />
    </div>
</template>
<script lang="ts" setup>
    import { useDialog, useMessage } from 'naive-ui';
    // 将 dialog & message 实例方法挂载
    window.$message = useMessage();
    window.$dialog = useDialog();
</script>
