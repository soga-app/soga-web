<template>
  <div class="calendar calendar-wrapper">
    <div class="calendar-header">
      <div class="date-controller year-minus" @click="handleDateChoose('year', 'minus')">&lt;</div>
      <div class="date-controller month-minus" @click="handleDateChoose('month', 'minus')"
        >&lt;</div
      >
      <div class="date-picker">
        <div class="date-picker-year">
          <n-select :value="alterDate.year" :options="options" />
        </div>
        <div class="date-picker-month">
          <n-select :value="alterDate.month + 1" :options="monthOption" />
        </div>
        <div class="date-picker-day">{{ alterDate.day }}</div>
      </div>
      <div class="date-controller year-plus" @click="handleDateChoose('month', 'plus')">&gt;</div>
      <div class="date-controller month-plus" @click="handleDateChoose('year', 'plus')">&gt;</div>
    </div>
    <div class="calendar-content">
      <div class="calendar-content-week">
        <div v-for="(item, index) in weeks" :key="index" class="week-item">{{ item }}</div>
      </div>
      <div class="calendar-content-day">
        <div
          v-for="(item, index) in days"
          :key="index"
          class="day-item"
          :isCurDay="item.isCurDay"
          :isThisMonth="item.isThisMonth"
          >{{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, watch } from 'vue';
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  interface dayItem {
    date: number;
    isThisMonth: number; // 1 表示当前月，2 表示上个月 ， 3表示下个月
    isCurDay: boolean;
  }
  let days: Array<dayItem> = reactive([]);
  const curDate = reactive({ year: 0, month: 0, day: 0 });
  const alterDate = reactive({ year: 0, month: 0, day: 0 });
  const monthOption = new Array(12);
  for (let i = 1; i <= 12; i++) {
    monthOption.push({ label: i, value: i });
  }

  watch(alterDate, (newVal) => {
    console.log('wath daozho');
    setDays(newVal.year, newVal.month);
  });

  onMounted(() => {
    const d = new Date();
    curDate.year = d.getFullYear();
    curDate.month = d.getMonth();
    curDate.day = d.getDate();
    alterDate.year = d.getFullYear();
    alterDate.month = d.getMonth();
    alterDate.day = d.getDate();
    setDays(curDate.year, curDate.month);
  });

  function handleDateChoose(type: 'year' | 'month', operation: 'minus' | 'plus') {
    if (operation === 'minus') {
      alterDate[type]--;
    }
    if (operation === 'plus') {
      alterDate[type]++;
    }
  }

  function setDays(year: number, month: number) {
    days = [];
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month);
    d.setDate(1);
    let firstOfDay = d.getDay();

    for (let i = 1; i <= 42; i++) {
      d.setDate(1);
      d.setMonth(month);
      d.setDate(i - firstOfDay);
      let isCurDay = false,
        isThisMonth = 1;
      if (
        d.getDate() === curDate.day &&
        d.getMonth() === curDate.month &&
        d.getFullYear() === curDate.year
      ) {
        isCurDay = true;
      }
      if (d.getMonth() < alterDate.month) {
        isThisMonth = 2;
      } else if (d.getMonth() > alterDate.month) {
        isThisMonth = 3;
      } else {
        isThisMonth = 1;
      }
      days.push({ date: d.getDate(), isCurDay, isThisMonth });
    }
  }
</script>
<style lang="less" scoped>
  .calendar-wrapper {
    background: #fff;
    color: #595959;
    padding: 16px;
  }
  .calendar {
    &-header {
      display: flex;
      align-items: center;
      .date-picker {
        display: flex;
        margin: 0 18px;
        align-items: center;
        &-year,
        &-month {
          width: 75px;
          font-size: 12px;
        }
      }
      .month-plus,
      .month-minus,
      .year-plus,
      .year-minus {
        cursor: pointer;
        color: #ddd;
        font-size: 14px;
        &:hover {
          color: #587ace;
          transition: color 0.2s;
        }
      }
      .year-plus,
      .year-minus {
        margin-right: 6px;
        color: #ddd;
      }
    }
    &-content {
      .day-item {
        text-align: center;
        line-height: 32px;
        cursor: pointer;
      }
      .day-item[isCurDay='true'] {
        background-color: #587ace;
        color: #fff;
        border-radius: 4px;
      }
      .day-item[isThisMonth='2'],
      .day-item[isThisMonth='3'] {
        color: #ddd;
      }
      &-week {
        display: grid;
        grid-template-columns: repeat(7, 36px);
        grid-template-rows: repeat(1, 32px);
        justify-items: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        color: #6f6f6f;
      }
      &-day {
        display: grid;
        grid-template-rows: repeat(6, 36px);
        grid-template-columns: repeat(7, 36px);
      }
    }
  }
</style>
