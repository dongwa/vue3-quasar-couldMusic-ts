<template>
  <div class="text-h6 text-weight-bolder">推荐歌单 ></div>
  <div class="q-my-xs row q-gutter-sm justify-between">
    <recommend-item
      class="col-2"
      v-for="(item, index) in recommendList"
      :key="index"
      :recommend="item"
    ></recommend-item>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import recommendItem from 'components/recommend/RecommendItem.vue';
import { getRecommendPlayList } from 'src/api/recommend';
import { IPlayListInfo } from 'src/api/recommend/recommend.model';

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
  let res = await getRecommendPlayList(9);
  res.unshift(dailyRecommend);
  recommendList.value = res;
}
fetchList();
</script>
