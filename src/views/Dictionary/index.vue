<template> 字典首页{{ count }} </template>
<script lang="ts" setup>
  import { ref } from 'vue';

  defineProps<{ msg: string }>();

  const count = ref(0);
</script>
