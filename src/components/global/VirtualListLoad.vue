<template>
  <!-- 使用虚拟列表加载过长的列表数据 -->
  <div ref="list" :style="{ height }" class="infinite-list-container" @scroll="scrollEvent">
    <div ref="phantom" class="infinite-list-phantom"></div>
    <div ref="content" class="infinite-list">
      <div
        v-for="item in visibleData"
        :id="item._index"
        ref="items"
        :key="item._index"
        class="infinite-list-item"
      >
        <slot ref="slot" :item="item.item" :index="Number(item._index.slice(1))"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, onUpdated, nextTick } from 'vue';
  interface PositionItem {
    top: number;
    bottom: number;
    height: number;
  }

  let list = ref<HTMLElement | null>(null);
  let phantom = ref<HTMLElement | null>(null);
  let content = ref<HTMLElement | null>(null);
  let items = ref<HTMLElement | null>(null);

  let screenHeight = ref(0);
  //起始索引
  let start = ref(0);
  //结束索引
  let end = ref(0);
  let positions: Array<PositionItem> = [];
  const props = defineProps({
    //所有列表数据
    listData: {
      type: Array<any>,
      default: () => []
    },
    //预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
    //缓冲区比例
    bufferScale: {
      type: Number,
      default: 1
    },
    //容器高度 100px or 50vh
    height: {
      type: String,
      default: '100%'
    }
  });

  const _listData = computed(() => {
    return props.listData.map((item: any, index: any) => {
      return {
        _index: `_${index}`,
        item
      };
    });
  });
  const visibleCount = computed(() => {
    return Math.ceil(screenHeight.value / props.estimatedItemSize);
  });
  const aboveCount = computed(() => {
    return Math.min(start.value, props.bufferScale * visibleCount.value);
  });
  const belowCount = computed(() => {
    return Math.min(props.listData.length - end.value, props.bufferScale * visibleCount.value);
  });
  const visibleData = computed(() => {
    let start1 = start.value - aboveCount.value;
    let end1 = end.value + belowCount.value;
    return _listData.value.slice(start1, end1);
  });

  function initPositions() {
    positions = props.listData.map((d: any, index: number) => ({
      index,
      height: props.estimatedItemSize,
      top: index * props.estimatedItemSize,
      bottom: (index + 1) * props.estimatedItemSize
    }));
  }
  //获取列表起始索引
  function getStartIndex(scrollTop = 0) {
    //二分法查找
    return binarySearch(positions, scrollTop);
  }
  function binarySearch(list: any, value: any) {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = null;

    while (start <= end) {
      let midIndex = Math.floor((start + end) / 2);
      let midValue = list[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end = end - 1;
      }
    }
    return tempIndex;
  }
  //获取列表项的当前尺寸
  function updateItemsSize() {
    let nodes = items.value;
    (nodes as any).forEach((node: HTMLElement) => {
      let rect = node.getBoundingClientRect();
      let height = rect.height;
      let index = +node.id.slice(1);
      let oldHeight = positions[index].height;
      let dValue = oldHeight - height;
      //存在差值
      if (dValue) {
        positions[index].bottom = positions[index].bottom - dValue;
        positions[index].height = height;
        for (let k = index + 1; k < positions.length; k++) {
          positions[k].top = positions[k - 1].bottom;
          positions[k].bottom = positions[k].bottom - dValue;
        }
      }
    });
  }
  //获取当前的偏移量
  function setStartOffset() {
    let startOffset;
    if (start.value >= 1) {
      let size =
        positions[start.value].top -
        (positions[start.value - aboveCount.value]
          ? positions[start.value - aboveCount.value].top
          : 0);
      startOffset = positions[start.value - 1].bottom - size;
    } else {
      startOffset = 0;
    }
    (content.value as any).style.transform = `translate3d(0,${startOffset}px,0)`;
  }
  //滚动事件
  function scrollEvent() {
    //当前滚动位置
    let scrollTop = list.value?.scrollTop;
    // let startBottom = this.positions[this.start - ]
    //此时的开始索引
    start.value = getStartIndex(scrollTop) as number;
    //此时的结束索引
    end.value = start.value + visibleCount.value;
    //此时的偏移量
    setStartOffset();
  }

  // 初始化position
  initPositions();

  onMounted(() => {
    screenHeight.value = (list.value as HTMLElement).clientHeight;
    start.value = 0;
    end.value = start.value + visibleCount.value;
  });

  onUpdated(() => {
    nextTick(() => {
      if (!items.value) {
        return;
      }
      //获取真实元素大小，修改对应的尺寸缓存
      updateItemsSize();
      //更新列表总高度
      let height = positions[positions.length - 1].bottom;
      (phantom.value as any).style.height = height + 'px';
      //更新真实偏移量
      setStartOffset();
    });
  });
</script>

<style lang="less" scoped>
  .infinite-list-container {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }

  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }

  .infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
  }

  .infinite-list-item {
    padding: 5px;
    color: #555;
    box-sizing: border-box;
    /* height:200px; */
  }
</style>
