<template>
  <div class="q-ml-xl q-pa-md">
    <carousel-card :banners="bannerList" />
    <recommend-list />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CarouselCard from 'components/carousel-card/index.vue';
import RecommendList from 'components/recommend/RecommendList.vue';
import { getBanners } from 'src/api/recommend';
import { IBannerInfo } from 'src/api/recommend/recommend.model';
export default defineComponent({
  components: { CarouselCard, RecommendList },
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
