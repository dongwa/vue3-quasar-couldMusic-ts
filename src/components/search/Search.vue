<template>
  <div>
    <q-input
      dense
      rounded
      standout="bg-red-7"
      input-class="text-white"
      class="q-ml-md"
      placeholder="搜索"
      v-model="searchVal"
      debounce="300"
      @focus="togglePopup = true"
      @blur="togglePopup = false"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="white" />
      </template>
      <div class="list-container" v-show="togglePopup">
        <!-- 热搜 -->
        <HotSearchList v-if="searchVal === ''" />
        <!-- 普通搜索 -->
        <CommonSearchList />
      </div>
    </q-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import HotSearchList from './HotSearchList.vue';
import CommonSearchList from './CommonSearchList.vue';

let searchVal = ref('');
let togglePopup = ref(false);

provide('searchVal', searchVal);
</script>
<style lang="scss" scoped>
.list-container {
  position: absolute;
  width: 300px;
  height: 520px;
  overflow: scroll;
  top: 40px;
  left: -50px;
  z-index: 999;
  background: #fff;
  border: 2px solid #f4f4f4;
  border-radius: 10px;
}
.sp {
  color: #5480b1 !important;
}
.search-list {
  overflow: auto;
  overflow-x: hidden;
  font-size: 12px;
  color: #333;
  .title {
    margin: 5px 5px;
  }
  .sub-title {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 5px;
    line-height: 28px;
    background: #f4f4f4;
  }
}
</style>
