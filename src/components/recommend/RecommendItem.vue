<template>
  <q-card
    square
    :bordered="false"
    flat
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
  >
    <q-card-section v-if="recommend.type === 0" class="q-pa-none">
      <q-img class="radius-sm" :src="recommend.picUrl">
        <div class="absolute-top-right caption flex items-center text-caption">
          <q-icon name="play_arrow" />
          {{ playCount(recommend.playCount) }}
        </div>
        <transition name="fade" mode="in-out" persisted :duration="500">
          <div
            v-show="isHover"
            class="absolute-bottom-right caption q-mr-sm q-mb-sm"
          >
            <q-btn size="sm" round color="white">
              <q-icon color="primary" name="play_arrow" />
            </q-btn>
          </div>
        </transition>
      </q-img>
    </q-card-section>
    <q-card-section v-else class="q-pa-none">
      <q-img width="100%" class="radius-sm" src="~assets/daily.png">
        <transition name="fade" mode="in-out" persisted :duration="500">
          <div
            v-show="isHover"
            class="absolute-bottom-right caption q-mr-sm q-mb-sm"
          >
            <q-btn size="sm" round color="white">
              <q-icon color="primary" name="play_arrow" />
            </q-btn>
          </div>
        </transition>
      </q-img>
    </q-card-section>
    <q-card-section class="q-mt-sm q-pa-none">
      {{ recommend.name }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ISongInfo } from 'src/api/recommend/recommend.model';
export default defineComponent({
  props: {
    recommend: {
      type: Object as PropType<ISongInfo>,
      required: true,
    },
  },
  setup() {
    function playCount(val: number) {
      if (val <= 10000) return val;
      return Math.floor(val / 10000) + '万';
    }
    return { playCount, isHover: ref(false) };
  },
});
</script>
<style lang="scss" scoped>
.caption {
  background: transparent;
  padding: 2px 4px 0 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
