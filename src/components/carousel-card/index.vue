<template>
  <div class="content">
    <swiper
      loop
      autoplay
      navigation
      centered-slides
      parallax
      effect="coverflow"
      :modules="modules"
      :coverflowEffect="coverflowEffect"
      :initialSlide="1"
      :slides-per-view="2"
      data-swiper-parallax="-300"
      :pagination="{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet bullet-margin-top',
      }"
      class="swiper-container"
    >
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <q-img
          class="swiper-img rounded-borders"
          :src="item.imageUrl"
          :ratio="16 / 9"
          spinner-color="primary"
          spinner-size="82px"
        >
          <q-badge
            class="chip"
            :color="item.titleColor"
            :label="item.typeTitle"
          />
        </q-img>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
//  swiper 额外组件配置
import { Navigation, Pagination, EffectCoverflow, Parallax } from 'swiper';

// swiper 单独样式 （less / scss）
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// swiper 必备组件
import { Swiper, SwiperSlide } from 'swiper/vue';

import { PropType, reactive } from 'vue';

defineProps({
  banners: {
    type: Array as PropType<Array<any>>,
    required: true,
  },
});

const coverflowEffect = reactive({
  rotate: 0,
  stretch: 110,
  depth: 200,
  modifier: 1,
  slideShadows: true,
});

const modules = [Navigation, Pagination, EffectCoverflow, Parallax];
</script>

<style lang="scss" scoped>
.content {
  .swiper-container {
    width: 100%;
    height: auto;
    margin: 20px auto;
    border-radius: 8px;
    .bullet-margin-top {
      color: #eee;
      margin-top: 100px;
    }
    .swiper-img {
      height: 200px;
      border-radius: 8px;
    }
    .chip {
      padding: 6px;
      bottom: 0;
      right: 0;
    }
  }

  --swiper-theme-color: $primary-color; /* 设置 Swiper风格 */
  --swiper-navigation-color: #eee; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 16px; /* 设置按钮大小 */
}
</style>
