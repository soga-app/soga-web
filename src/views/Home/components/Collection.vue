<template>
  <div class="collection-wrap">
    <div class="collection-list">
      <n-collapse arrow-placement="right" @update:expanded-names="unfold">
        <n-collapse-item v-for="item in colList" :key="item.id" :title="item.name" :name="item.id">
          <template #header-extra>
            <span style="margin-right: 24px"
              ><svg-icon
                name="icon-bianjishuru"
                hover-color="#587acb"
                @click.stop="handleEditName(item)"
              />
            </span>
            <span
              ><svg-icon
                name="icon-shanchusekuai"
                hover-color="#587acb"
                @click.stop="handleDeleteCol(item)"
            /></span>
          </template>
          <div>
            <div v-for="obj in colObj[item.id]" :key="obj.id" class="col-item">
              <div class="col-item-left">{{ obj.type }}</div>
              <div class="col-item-right">
                <div class="col-item-right-up">{{ obj.sentence }}</div>
                <div class="col-item-right-down">{{ obj.mean }}</div>
              </div>
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
  <n-modal
    v-model:show="showDeleteModal"
    preset="dialog"
    title="确认"
    :content="`确认删除名为
    ${curName}
    的收藏夹`"
    positive-text="确认"
    negative-text="取消"
    :loading="delteLoading"
    @positive-click="delelteCol"
    @negative-click="showDeleteModal = false"
  />
  <n-modal
    v-model:show="showEditModal"
    preset="dialog"
    title="更改名称"
    positive-text="更改"
    negative-text="取消"
    :loading="editLoading"
    @positive-click="editName"
    @negative-click="showEditModal = false"
  >
    <n-input v-model:value="curName"></n-input>
  </n-modal>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import api from '@/api';
  import mybus from '@/util/mybus';

  interface infoMap {
    [key: string]: any;
  }

  let colList = ref();
  let colObj = ref<infoMap>({});
  let showDeleteModal = ref(false);
  let showEditModal = ref(false);
  let curId = ref();
  let curName = ref('');
  let delteLoading = ref(false);
  let editLoading = ref(false);

  onMounted(async () => {
    colList.value = await api.collection.getCollectionList();
  });

  const unfold = async (arr: Array<number>) => {
    let colId = arr[arr.length - 1];
    if (colId && !colObj.value[colId]) {
      const res = await api.collection.getCollectionFile({ colId });
      colObj.value[colId] = res;
    }
  };

  const handleEditName = (item: any) => {
    showEditModal.value = true;
    curId.value = item.id;
    curName.value = item.name;
  };

  const handleDeleteCol = (item: any) => {
    showDeleteModal.value = true;
    curId.value = item.id;
    curName.value = item.name;
  };
  const editName = async () => {
    editLoading.value = true;
    try {
      await api.collection.updateCollectionName({ name: curName.value, id: curId.value });
      window.$message.success('更改成功');
      colList.value = await api.collection.getCollectionList();
      mybus.emit('refreshCol');
    } catch (e) {
      window.$message.error(e);
    }
    editLoading.value = false;
  };
  const delelteCol = async () => {
    delteLoading.value = true;
    try {
      await api.collection.deleteCollection({ id: curId.value });
      window.$message.success('删除成功');
      colList.value = await api.collection.getCollectionList();
    } catch (e) {
      window.$message.error(e);
    }
    delteLoading.value = false;
  };
</script>

<style lang="less" scoped>
  .collection-wrap {
    background: #fff;
    padding: 16px 24px;
    color: #8a8a8a;
  }
  .col-item {
    display: flex;
    width: 300px;
    height: 50px;
    align-items: center;
    color: #8a8a8a;
    &-left {
      border: 1px solid #6787d2;
      border-radius: 4px;
      color: #6787d2;
      width: 40px;
      height: 30px;
      line-height: 30px;
      margin-right: 8px;
      text-align: center;
    }
    &-right {
      width: 230px;
      &-up {
        max-width: 220px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        overflow: hidden;
      }
      &-down {
        overflow: hidden;
        max-width: 190px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
      }
    }
  }
</style>
