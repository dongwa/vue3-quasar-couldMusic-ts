<template>
  <div class="hot-search-list" v-show="!loading">
    <div class="hot-title">热搜榜</div>
    <q-list v-if="hotSearchList">
      <q-item
        v-for="(item, index) in hotSearchList"
        :key="index"
        clickable
        v-ripple
        class="hot-search-item"
      >
        <q-item-section side>
          <q-item-label :class="[{ 'index-top': index < 3 }, 'index']">{{ index + 1 }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label :class="[{ 'text-weight-bold': index < 3 }, 'name']">
            {{ item.searchWord }}
            <q-img
              :class="[{ 'scale_salf': item.iconType === 5 }, 'hot-icon']"
              fit="scale-down"
              width="25px"
              height="25px"
              v-if="item.iconType"
              :src="item.iconUrl"
            ></q-img>
            <span class="score">{{ item.score }}</span>
          </q-item-label>
          <q-item-label class="content">{{ item.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <Loading :showing="loading"></Loading>
</template>

<script lang="ts" setup>
import Loading from '../loading/index.vue';
import { useFetchWithLoading } from '../hooks/loading';
import { getHotSearch } from 'src/api/search';

const { data: hotSearchList, loading } = useFetchWithLoading(getHotSearch);
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
    .scale_salf {
      transform: scale(0.5);
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
