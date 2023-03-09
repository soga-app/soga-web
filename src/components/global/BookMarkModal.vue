<template>
  <n-modal v-model:show="showModal">
    <div class="modal">
      <div class="modal-up">
        <div class="modal-title">
          <div class="modal-title-text">添加收藏</div>
          <svg-icon
            class="modal-title-close"
            name="icon-guanbi"
            font-size="16px"
            @click="showModal = false"
          />
        </div>
      </div>
      <div class="modal-down">
        <div class="modal-input">
          <n-input v-model:value="inputVal" placeholder="最多可以输入20个字" clearable>
            <template #suffix>
              <n-button color="#587acb" @click="handleCreate">新建</n-button>
            </template>
          </n-input>
        </div>
        <div class="modal-favorite-list">
          <div v-for="(item, index) in favoriteList" :key="`@${index}`" class="modal-favorite-item">
            <div class="modal-favorite-item-left">{{ item.name }}</div>
            <div class="modal-favorite-item-right"
              ><n-button round type="tertiary" size="small" @click="emit('collectContent', item.id)"
                >收藏</n-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  const props = defineProps(['showBookMarkModal', 'favoriteList']);
  const emit = defineEmits(['updateBookMarkModal', 'createCollection', 'collectContent']);

  let inputVal = ref('');

  const showModal = computed({
    get: () => props.showBookMarkModal,
    set: (val) => {
      emit('updateBookMarkModal', val);
    }
  });
  onMounted(() => {
    console.log('favoriteList is', props.favoriteList);
  });

  const handleCreate = () => {
    emit('createCollection', inputVal.value);
  };
</script>

<style lang="less" scoped>
  .modal {
    width: 370px;
    background: #fff;
    color: #8a8a8a;
    &-up {
      padding: 16px 24px 8px 24px;
      border-bottom: 1px solid #ccc;
      .modal-title {
        position: relative;
        height: 24px;
        line-height: 24px;
        padding: 2px 0;
        text-align: center;
        &-close {
          position: absolute;
          right: -4px;
          top: 0;
        }
      }
    }
    &-down {
      padding: 16px 24px;
      .modal-favorite-list {
        margin-top: 20px;
      }
      .modal-favorite-item {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        &:hover {
          background-color: #5d80d016;
        }
      }
    }
  }
  /deep/ .n-input .n-input-wrapper {
    padding-right: 0;
  }
</style>
