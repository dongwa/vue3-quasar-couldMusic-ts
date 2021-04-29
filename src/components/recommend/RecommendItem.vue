<template>
  <q-card
    square
    :bordered="false"
    flat
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
  >
    <!-- 普通歌单 -->
    <q-card-section v-if="recommend.type === 0" class="q-pa-none">
      <q-img class="radius-sm" spinner-color="primary" :src="recommend.picUrl">
        <div class="absolute-top-right caption flex items-center text-caption">
          <q-icon name="play_arrow" />
          {{ playCount(recommend.playCount) }}
        </div>
        <transition name="fade" mode="in-out" persisted :duration="500">
          <div
            v-show="isHover"
            class="absolute-bottom-right caption q-mr-sm q-mb-sm"
          >
            <q-btn
              size="sm"
              round
              color="white"
              @click="changePlaylist(recommend.id)"
            >
              <q-icon color="primary" name="play_arrow" />
            </q-btn>
          </div>
        </transition>
      </q-img>
    </q-card-section>
    <!-- 每日推荐歌单 -->
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
import { IPlayListInfo } from 'src/api/recommend/recommend.model';
import { useStore } from 'vuex';
import { getPlaylistInfoById, getPlaylist } from 'src/api/player';
import {
  IPlaylistDetail,
  TrackId,
  ISongInfo,
} from 'src/api/player/playlist.model';
export default defineComponent({
  props: {
    recommend: {
      type: Object as PropType<IPlayListInfo>,
      required: true,
    },
  },
  setup() {
    const $s = useStore();
    function playCount(val: number) {
      if (val <= 10000) return val;
      return Math.floor(val / 10000) + '万';
    }
    async function changePlaylist(id: number) {
      let res: IPlaylistDetail = await getPlaylistInfoById(id);
      let trackIds: TrackId[] = res.trackIds;
      let ids: string = trackIds.reduce((pre, cur, i) => {
        if (i === 0) return cur.id + '';
        return pre + ',' + cur.id;
      }, '');
      let playlist: ISongInfo[] = await getPlaylist(ids);
      $s.commit('player/setPlaylist', playlist);
    }
    return { playCount, isHover: ref(false), changePlaylist };
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
