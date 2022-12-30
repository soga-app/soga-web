<template>
  <div class="calendar calendar-wrapper">
    <div class="calendar-header">
      <div class="date-controller year-minus" @click="yearMinus">&lt;</div>
      <div class="date-controller month-minus" @click="monthMinus">&lt;</div>
      <div class="date-picker">
        <div class="date-picker-year">
          <n-select :value="alterDate.year" :options="yearOption" @update:value="updateYear" />
        </div>
        <div class="date-picker-delimiter">-</div>
        <div class="date-picker-month">
          <n-select
            :value="alterDate.month + 1"
            :options="monthOption"
            @update:value="updateMonth"
          />
        </div>
        <div class="date-picker-delimiter">-</div>
        <div class="date-picker-day">{{ alterDate.day }}</div>
      </div>
      <div class="date-controller year-plus" @click="monthPlus">&gt;</div>
      <div class="date-controller month-plus" @click="yearPlus">&gt;</div>
    </div>
    <div class="calendar-content">
      <div class="calendar-content-week">
        <div v-for="(item, index) in weeks" :key="index" class="week-item">{{ item }}</div>
      </div>
      <div class="calendar-content-day">
        <div
          v-for="(item, index) in days"
          :key="index"
          class="day-item-container"
          @mouseover="dayItemOver(index)"
          @mouseout="dayItemOut(index)"
        >
          <div
            class="day-item"
            :isCurDay="item.isCurDay"
            :isThisMonth="item.isThisMonth"
            :isHighlight="item.isHighlight"
            >{{ item.date }}
            <div v-show="item.isHighlight && item.isOver" class="day-item-pop tip-pop">
              <div class="tip-pop-content">
                <div class="word-progress">
                  <div class="word-new">新词：15</div>
                  <div class="word-old">旧词：20</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, watch, computed } from 'vue';
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  interface dayItem {
    date: number;
    isThisMonth: number; // 1 表示当前月，2 表示上个月 ， 3表示下个月
    isCurDay: boolean;
    isHighlight: boolean;
    [propName: string]: any;
  }
  let days: Array<dayItem> = reactive([]);
  const curDate = reactive({ year: 0, month: 0, day: 0 }); //month 月份 0~11 ，day 星期 0~6
  const alterDate = reactive({ year: 0, month: 0, day: 0 });
  const monthOption: Array<{ label: number; value: number }> = [];
  for (let i = 1; i <= 12; i++) {
    monthOption.push({ label: i, value: i });
  }

  watch(alterDate, (newVal) => {
    setDays(newVal.year, newVal.month);
  });

  let yearOption = computed(() => {
    const arr = [];
    for (let i = -2; i <= 2; i++) {
      let val = curDate.year + i;
      arr.push({ label: val, value: val });
    }
    return arr;
  });

  function dayItemOver(index: number) {
    days[index].isOver = true;
  }
  function dayItemOut(index: number) {
    days[index].isOver = false;
  }

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

  function updateYear(val: number) {
    alterDate.year = val;
  }

  function updateMonth(val: number) {
    alterDate.month = val - 1;
  }

  function yearMinus() {
    alterDate.year--;
  }

  function monthMinus() {
    if (alterDate.month === 0) {
      alterDate.year--;
      alterDate.month = 11;
    } else {
      alterDate.month--;
    }
  }

  function yearPlus() {
    alterDate.year++;
  }

  function monthPlus() {
    if (alterDate.month === 11) {
      alterDate.year++;
      alterDate.month = 0;
    } else {
      alterDate.month++;
    }
  }

  function setDays(year: number, month: number) {
    days.length = 0;
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
      days.push({ date: d.getDate(), isCurDay, isThisMonth, isHighlight: false, isOver: false });
    }
    //测试demo
    days[11].isHighlight = true;
    days[12].isHighlight = true;
    days[13].isHighlight = true;
    days[15].isHighlight = true;
    days[29].isHighlight = true;
    days[20].isHighlight = true;
    days[33].isHighlight = true;
  }
</script>
<style lang="less" scoped>
  .calendar-wrapper {
    background: #fff;
    color: #70729e;
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
          width: 78px;
        }
        &-delimiter {
          font-size: 16px;
          color: #c3c3c3;
          margin: auto 4px;
        }
      }
      .month-plus,
      .month-minus,
      .year-plus,
      .year-minus {
        cursor: pointer;
        color: #c3c3c3;
        font-size: 14px;
        &:hover {
          color: #587ace;
          transition: color 0.2s;
        }
      }
      .year-plus,
      .year-minus {
        margin-right: 6px;
        color: #c3c3c3;
      }
    }
    &-content {
      padding: 3px;
      .day-item {
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        position: relative;
        &:hover {
          background-color: #c6d0e830;
        }
        &-pop {
          position: absolute;
          left: 54px;
          top: -10px;
          &::before {
            content: '';
            width: 0;
            height: 0;
            border-right: 8px solid #fff;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            position: absolute;
            z-index: 1000;
            left: -8px;
          }
        }
      }
      .tip-pop {
        background-color: #fff;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 9px 28px 8px rgba(0, 0, 0, 0.05);
        padding: 8px 14px;
        border-radius: 3px;
        z-index: 99;
      }

      .day-item[isCurDay='true'] {
        border-radius: 4px;
        background: #587ace;
        background-size: 50%;
        color: #fff;
        width: 32px;
        height: 32px;
        line-height: 32px;
        margin: 4px;
      }
      .day-item[isHighlight='true'] {
        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 18px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #587ace;
        }
      }

      .day-item[isThisMonth='2'],
      .day-item[isThisMonth='3'] {
        color: #ddd;
      }
      &-week {
        display: grid;
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(1, 36px);
        justify-items: center;
        align-items: center;
        border-bottom: 1px solid #ddd;
        color: #6f6f6f;
      }
      &-day {
        margin-top: 4px;
        display: grid;
        grid-template-rows: repeat(6, 40px);
        grid-template-columns: repeat(7, 40px);
      }
    }
    .word-progress {
      display: flex;
      width: 64px;
      line-height: 18px;
      flex-direction: column;

      padding: 2px;
      .word-new {
        border-radius: 2px;
        color: #fff;
        background-color: #bfaef7;
      }
      .word-old {
        margin-top: 4px;
        border-radius: 2px;
        color: #fff;
        background-color: rgb(244, 202, 86);
      }
    }
  }
</style>
