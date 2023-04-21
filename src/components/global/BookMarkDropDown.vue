<template>
  <!-- 可以通过 slot 为 father 的插槽自定义 父选项的样式；
  通过 slot 为 child 的插槽自定义 子选项的样式；
  默认展示第一个子选项
 -->
  <div class="book-mark-dropdown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot name="trigger" class="trigger"></slot>
    <div id="display-content">
      <div class="display-content-wrap">
        <div class="display-content-left">
          <div
            v-for="(item, index) in options"
            :key="item.label"
            :class="`prarent-option-item ${curParentChoice === index ? 'curParentOption' : ''}`"
            @click="updateChildOption(item.value, index)"
          >
            <div v-if="!$slots.father" class="father-option-inner">
              {{ item.label }}
            </div>
            <slot name="fatherOption" :fatheroptions="item"></slot>
          </div>
        </div>
        <div class="display-content-right">
          <div v-for="(item, index) in curChildOption" :key="index" class="children-option-item">
            <div v-if="!$slots.child" class="child-option-inner">
              {{ item.label }}
            </div>
            <slot name="child" :option="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface BookMarkProps {
    options: Array<OptionItem>;
    curChildOption: Array<ChildOptionItem>;
  }
  const props = defineProps<BookMarkProps>();
  const emits = defineEmits(['updateChildOption', 'visibleChange']);
  let curParentChoice = ref(0);

  const handleMouseEnter = () => {
    (document.getElementById('display-content') as HTMLElement).style.display = 'block';
    emits('visibleChange', true);
  };

  const handleMouseLeave = () => {
    (document.getElementById('display-content') as HTMLElement).style.display = 'none';
    emits('visibleChange', false);
  };

  const updateChildOption = (value: any, index: number) => {
    curParentChoice.value = index;
    emits('updateChildOption', value);
  };
</script>

<style lang="less" scoped>
  .book-mark-dropdown {
    position: relative;
    z-index: 999;
    .tirgger {
    }
    #display-content {
      width: 410px;
      background: #fff;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
      padding: 12px 14px;
      position: absolute;
      display: none;
      transform: translateX(-50%);
      color: #8a8a8a;
    }
    .display-content-wrap {
      overflow: hidden;
      max-height: 410px;
    }
    .display-content-left {
      margin-right: 8px;

      overflow-y: auto;
      float: left;

      height: 100%;
      .prarent-option-item {
        cursor: pointer;
        &:hover {
          background: #d8e1f684;
        }
      }
      .curParentOption {
        background: #d8e1f684;
      }
    }
    .display-content-right {
      width: 320px;
      max-width: 320px;
      max-height: 400px;
      float: left;
      overflow-y: auto;
      padding-left: 10px;
      border-left: 1px solid #ddd;
      .children-option-item {
        cursor: pointer;
        &:hover {
          background: #d8e1f684;
        }
      }
    }
    .father-option-inner,
    .child-option-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
    .father-option-inner {
      width: 70px;
    }
    .child-option-inner {
      width: 230px;
    }
  }
</style>
