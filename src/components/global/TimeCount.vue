<template>
  <!--  时间统计组件
    默认显示从某一个时刻开始的 小时：分钟 ：秒 的流逝
    提供一个数组显示需要展示的信息 ['hour','minute','second'] ,默认展示全部
    每次时间改变通过 function timeChange(timeObj) 获得当前时间
    可通过默认插槽来改变默认显示样式,提供插槽props 名为 timeObj -->
  <div
    ><div v-if="!$slots.default">
      <span v-show="timeObj.hour">{{ `${timeObj.hour} h ` }}</span>
      <span v-show="timeObj.minute">{{ `${timeObj.minute} min ` }}</span>
      <span>{{ `${timeObj.second} s` }}</span>
    </div>
    <slot :time-obj="timeObj"> </slot
  ></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['timeChange']);

  let time = null as any;
  let timeObj = ref({ hour: 0, minute: 0, second: 0 });

  onMounted(() => {
    start();
  });

  const start = () => {
    time = setInterval(() => {
      timeObj.value.second++;
      if (timeObj.value.second === 60) {
        timeObj.value.minute++;
        timeObj.value.second = 0;
      }
      if (timeObj.value.minute === 60) {
        timeObj.value.hour++;
        timeObj.value.minute = 0;
      }
      emit('timeChange', timeObj);
    }, 1000);
  };

  const end = () => {
    clearInterval(time);
    return timeObj;
  };

  defineExpose({
    end
  });
</script>

<style lang="less" scoped></style>
