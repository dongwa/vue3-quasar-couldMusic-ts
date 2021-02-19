<template>
  <div class="hot-search-list">
    <div class="hot-title">热搜榜</div>
    <q-list>
      <q-item
        v-for="(item, index) in hotSearchList"
        :key="index"
        clickable
        v-ripple
        class="hot-search-item"
      >
        <q-item-section side>
          <q-item-label :class="[{ 'index-top': index < 3 }, 'index']">{{
            index + 1
          }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label :class="[{ 'text-weight-bold': index < 3 }, 'name']">
            {{ item.searchWord }}
            <q-img
              class="hot-icon"
              width="25px"
              v-if="item.iconType"
              :src="item.iconUrl"
            ></q-img>
            <span class="score">{{ item.score }}</span></q-item-label
          >
          <q-item-label class="content">{{ item.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script lang="ts">
import { api } from '../../boot/axios';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    let searchVal = ref('');
    let hotSearchList = useHotSearch();
    onMounted(() => {
      hotSearchList = useHotSearch();
    });
    return { searchVal, hotSearchList };
  },
});
//热搜接口返回数据格式
interface hotSearchItem {
  alg: string;
  content: string;
  iconType: number;
  iconUrl: string;
  score: number;
  searchWord: String;
  source: number;
  url: string;
}
//获取热搜
function useHotSearch() {
  let hotSearchList = ref<hotSearchItem[]>([]);
  api
    .get('/search/hot/detail')
    .then((res: any) => {
      // console.log(res);
      hotSearchList.value = res.data as hotSearchItem[];
    })
    .catch((err) => {
      console.log(err);
    });
  return hotSearchList;
}
</script>
<style lang="scss" scoped>
.hot-search-list {
  .hot-title {
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    color: #666;
    text-indent: 1em;
  }
  .hot-search-item {
    .index-top {
      color: red !important;
    }
    .index {
      font-size: 17px;
      color: #cfcfcf;
      text-align: center;
    }
    .name {
      font-size: 14px;
      font-size: 13px;
      color: #333;
    }
    .hot-icon {
      margin: 0 0 0 10px;
    }
    .score {
      margin-left: 10px;
      font-family: serif;
      font-size: 12px;
      color: #ccc;
    }
    .content {
      font-weight: 50;
      font-size: 12px;
      color: #bfbfbf;
    }
  }
}
</style>
