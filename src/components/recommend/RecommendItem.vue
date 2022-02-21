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
              :class="{ loading: loading }"
              size="sm"
              round
              color="white"
              @click="changePlaylist(recommend.id)"
            >
              <q-icon
                color="primary"
                :name="loading ? 'refresh' : 'play_arrow'"
              />
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
<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { IPlayListInfo } from 'src/api/recommend/recommend.model';
import { getPlaylistInfoById, getPlaylist } from 'src/api/player';
import {
  IPlaylistDetail,
  TrackId,
  ISongInfo,
} from 'src/api/player/playlist.model';
import { usePlayerStore } from 'src/stores';

defineProps({
  recommend: {
    type: Object as PropType<IPlayListInfo>,
    required: true,
  },
});

let loading = ref(false);
let isHover = ref(false);
const player = usePlayerStore();

/** 计算播放量 */
function playCount(val: number) {
  if (val <= 10000) return val;
  return Math.floor(val / 10000) + '万';
}

//根据歌单id获取歌单
async function changePlaylist(id: number) {
  loading.value = true;
  isHover.value = true;
  /** 1. 根据歌单id获取歌单中的所有歌曲id */
  let res: IPlaylistDetail = await getPlaylistInfoById(id);
  let trackIds: TrackId[] = res.trackIds;
  /** 2. 避免等待很久，先把歌单中的第一首歌播放 */
  let ids = trackIds[0].id.toString();
  let curSong = await getPlaylist(ids);
  player.setCurentPlaySong(curSong[0]);

  /** 3. 播放后再获取歌单内的所有歌曲,网络很慢，尽量使用普通for来提升性能，，，， */
  for (let i = 0; i < trackIds.length; i++) {
    ids += ',' + trackIds[i].id;
  }
  let playlist: ISongInfo[] = await getPlaylist(ids);
  player.setPlaylist(playlist);
  loading.value = false;
  isHover.value = false;
}
</script>
<style lang="scss" scoped>
.loading {
  animation: rotate360 1s infinite;
}
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
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
