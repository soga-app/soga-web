<template>
  <div ref="container" class="container">
    <div ref="picker" class="picker" style="--top: 0">
      <ul>
        <li v-for="(item, index) in list" :key="`${index}@`" style="white-space: pre">{{
          item
        }}</li>
      </ul>
    </div>
    <div class="clip">
      <div ref="wrapper" class="wrapper">
        <ul>
          <li v-for="(item, index) in list" :key="`${index}@`" style="white-space: pre">{{
            item
          }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  const props = defineProps(['list']);
  const picker = ref<HTMLElement | null>(null);
  const wrapper = ref<HTMLElement | null>(null);
  const container = ref<HTMLElement | null>(null);
  const gap = 40;

  // 事件处理
  function eventHandler(e: any) {
    // e.bubbles = false; //默认跳过冒泡
    e.preventDefault();
    let event: any;
    let tmp: any;
    // 判断事件类型
    switch (e.type) {
      case 'mousedown':
        // 创建自定义事件 slidestart
        event = new CustomEvent('slidestart');
        tmp = 'screenY' in e ? e : e.touches[0];
        break;
      case 'mousemove':
        // 创建自定义事件 sliding
        event = new CustomEvent('sliding');
        tmp = 'screenY' in e ? e : e.touches[0];
        break;
      case 'mouseup':
        // 创建自定义事件 slideend
        event = new CustomEvent('slideend');
        tmp = 'screenY' in e ? e : e.touches[0];
        break;
    }
    // 初始化自定义事件
    event.y = tmp.screenY;
    event.original = e;
    // 触发自定义事件
    (this as any).dispatchEvent(event);
  }

  let startY = 0,
    moveY = 0,
    disY = 0,
    dragable = false,
    times = 0;
  onMounted(() => {
    let length = picker.value?.querySelectorAll('li').length as number;
    console.log('li is', length);
    // 绑定自定义事件
    container.value?.addEventListener('slidestart', function ({ y }) {
      dragable = true;
      startY = y;
      picker.value?.classList.remove('transition');
      wrapper.value?.classList.remove('transition');
      container.value?.classList.add('grabbing');
    });
    document.addEventListener('sliding', function ({ y }) {
      if (!dragable) return;
      moveY = y;
      disY = moveY - startY;
      let value = (picker.value?.style as any).getPropertyValue('--top') * 1;
      //只移动不超过0.5px的话，数字弹回原版底
      value += disY + (Math.abs(disY) >= 0.5 ? times : 1);
      let num = -value / gap;
      (picker.value?.style as any).setProperty('--top', value);
      (wrapper.value?.style as any).setProperty('--num', num);
      startY = moveY;
    });
    document.addEventListener('slideend', function ({ y }) {
      if (!dragable) return;
      moveY = y;
      const maxTop = (length - 3) * gap;
      disY = moveY - startY;
      let value = (picker.value?.style as any).getPropertyValue('--top') * 1;
      value += disY;
      picker.value?.classList.add('transition');
      wrapper.value?.classList.add('transition');
      //120正好是两个数字的高度，最前不能小于这个高度
      value = Math.min(gap * 2, Math.max(-maxTop, Math.round(value / gap) * gap));
      (picker.value?.style as any).setProperty('--top', value);
      //滑动超过数字的高度的一半，松开按钮，选择器自动跳到下一个数字
      (wrapper.value?.style as any).setProperty('--num', Math.round(-value / gap));
      container.value?.classList.remove('grabbing');
      startY = moveY;
      dragable = false;
    });

    // 把鼠标事件与自定义事件进行关联
    container.value?.addEventListener('mousedown', eventHandler);
    document.addEventListener('mousemove', eventHandler);
    document.addEventListener('mouseup', eventHandler);
  });
</script>

<style lang="less" scoped>
  * {
    /* 初始化 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul {
    width: 100%;
  }
  ul li {
    list-style: none;
    font-size: 20px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .container {
    width: 90vw;
    max-width: 400px;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    /* 光标为手 */
    cursor: grab;
    border-radius: 8px;
    /* 内阴影 */
    box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.3);
    /* 蒙版（自上而下：透明-黑色-透明） */
    -webkit-mask: linear-gradient(to bottom, transparent, #000, transparent);
    user-select: none;
    overflow: hidden;
  }
  /* 光标为抓拳 */
  .container.grabbing {
    cursor: grabbing;
  }
  /* 未选项 */
  .picker {
    color: #3b3b60;
    width: 100%;
    display: flex;
    transform: translateY(calc(var(--top) * 1px));
  }
  /* 选中项（高亮） */
  .clip {
    position: absolute;
    color: rgb(47, 47, 242);
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    top: 80px;
    overflow: hidden;
  }
  /* 左边三角形 */
  .clip::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left: 8px solid rgb(47, 47, 242);
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
  }
  /* 右边三角形 */
  .clip::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right: 8px solid rgb(47, 47, 242);
    top: 50%;
    transform: translateY(-50%);
    right: 2px;
  }
  .clip .wrapper {
    /* --num为css的自定义属性，可通过var函数对其调用 */
    --num: 0;
    margin-top: -80px;
    transform: translateY(calc(var(--num) * -40px));
  }
  .transition {
    /* 过渡 */
    transition: transform 0.35s;
  }
</style>
