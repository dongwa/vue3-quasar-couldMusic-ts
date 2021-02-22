<template>
  <div class="q-pa-md">
    <CarouselCard :banners="bannerList" />
  </div>
</template>
<script lang="ts">
import { api } from '../../boot/axios';
import { defineComponent, ref, onMounted } from 'vue';
import CarouselCard from 'components/carousel-card/index.vue';
export default defineComponent({
  components: { CarouselCard },
  setup() {
    let bannerList = ref([]);
    function fetchBannerList() {
      api
        .get('/banner?type=2')
        .then((res: any) => {
          bannerList.value = res.banners;
          console.log(bannerList);
        })
        .catch((err) => {
          console.log(err);
        });
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
