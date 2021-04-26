<template>
  <div class="q-ml-xl q-pa-md q-gutter-y-lg">
    <!-- banners -->
    <carousel-card :banners="bannerList" />
    <!-- 推荐歌单 -->
    <recommend-list />
    <!-- 独家放送 -->
    <private-content-list />
    <!-- 新歌推荐 -->
    <new-song />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBanners } from 'src/api/recommend';
import { IBannerInfo } from 'src/api/recommend/recommend.model';
import CarouselCard from 'components/carousel-card/index.vue';
import RecommendList from 'components/recommend/RecommendList.vue';
import PrivateContentList from 'components/recommend/PrivateContentList.vue';
import NewSong from 'components/recommend/NewSong.vue';
export default defineComponent({
  components: { CarouselCard, RecommendList, PrivateContentList, NewSong },
  setup() {
    let bannerList = ref<IBannerInfo[]>([]);
    async function fetchBannerList() {
      bannerList.value = await getBanners(0);
    }
    onMounted(() => {
      fetchBannerList();
    });
    return {
      bannerList,
      slide: ref(1),
    };
  },
});
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
