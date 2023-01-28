<template>
  <div class="q-ml-xl q-pa-md q-gutter-y-lg">
    <!-- banners -->
    <carousel-card />
    <!-- 推荐歌单 -->
    <recommend-list />
    <!-- 独家放送 -->
    <private-content-list />
    <!-- 新歌推荐 -->
    <new-song />
  </div>
</template>
<script lang="ts" setup>
import CarouselCard from 'components/carousel-card/index.vue';
import RecommendList from 'components/recommend/RecommendList.vue';
import PrivateContentList from 'components/recommend/PrivateContentList.vue';
import NewSong from 'components/recommend/NewSong.vue';
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
