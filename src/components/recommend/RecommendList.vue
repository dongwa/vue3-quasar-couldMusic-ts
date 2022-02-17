<template>
  <div class="text-h6 text-weight-bolder">推荐歌单 ></div>
  <div class="q-my-xs row q-gutter-sm justify-between" v-if="!loading">
    <recommend-item
      class="col-2"
      v-for="(item, index) in recommendList"
      :key="index"
      :recommend="item"
    ></recommend-item>
  </div>
  <Skeleton v-else></Skeleton>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Skeleton from 'components/skeleton/Ytb.vue';
import { getRecommendPlayList } from 'src/api/recommend';
import { IPlayListInfo } from 'src/api/recommend/recommend.model';
import recommendItem from 'components/recommend/RecommendItem.vue';

let loading = ref(true);
let recommendList = ref<IPlayListInfo[]>([]);
async function fetchList() {
  let dailyRecommend: IPlayListInfo = {
    id: 0,
    type: -1,
    name: '每日歌曲推荐',
    copywriter: '',
    picUrl: '',
    canDislike: true,
    trackNumberUpdateTime: '',
    playCount: 0,
    trackCount: 0,
    highQuality: false,
    alg: '',
  };
  loading.value = true;
  let res = await getRecommendPlayList(9);
  res.unshift(dailyRecommend);
  recommendList.value = res;
  loading.value = false;
}

fetchList();
</script>
