<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="grey-4"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide
        v-for="(item, index) in bannerList"
        :key="index"
        :name="index"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img class="rounded-borders full-height" :src="item.pic" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script lang="ts">
import { api } from '../../boot/axios';
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
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
