<template>
  <!-- 可以通过 slot 为 father 的插槽自定义 父选项的样式；
  通过 slot 为 child 的插槽自定义 子选项的样式； -->
  <div class="book-mark-dropdown" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <slot name="trigger" class="trigger"></slot>
    <div id="display-content">
      <div class="display-content-wrap">
        <div class="display-content-left">
          <div
            v-for="(item, index) in options"
            :key="item.label"
            class="prarent-option-item"
            @click="changeChildOption(index)"
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
  import { ref, onMounted } from 'vue';
  interface OptionItem {
    label: string;
    value: string;
    info?: object;
    child: Array<{
      label: string;
      value: string;
      info?: object;
    }>;
  }

  interface BookMarkProps {
    options: Array<OptionItem>;
  }
  const props = defineProps<BookMarkProps>();

  let curChildOption = ref();

  onMounted(() => {
    curChildOption.value = props.options[0].child;
  });

  const handleMouseOver = () => {
    (document.getElementById('display-content') as HTMLElement).style.display = 'block';
  };

  const handleMouseOut = () => {
    (document.getElementById('display-content') as HTMLElement).style.display = 'none';
  };

  const changeChildOption = (num: number) => {
    curChildOption.value = props.options[num].child;
  };
</script>

<style lang="less" scoped>
  .book-mark-dropdown {
    position: relative;
    z-index: 999;
    .tirgger {
    }
    #display-content {
      width: 400px;

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
      max-height: 400px;
    }
    .display-content-left {
      margin-right: 12px;
      padding-right: 4px;
      overflow-y: auto;
      float: left;
      border-right: 1px solid #ddd;
      height: 100%;
      .prarent-option-item {
        cursor: pointer;
        &:hover {
          background: #d8e1f684;
        }
      }
    }
    .display-content-right {
      max-height: 500px;
      float: left;
      overflow-y: auto;
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
      width: 64px;
    }
    .child-option-inner {
      width: 240px;
    }
  }
</style>
