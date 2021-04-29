<template>
  <div class="flex justify-center q-my-sm">
    <q-btn-group rounded outline>
      <q-btn
        rounded
        :class="{ 'text-white bg-grey-5': tab === 'playlist' }"
        label="播放列表"
        @click="tab = 'playlist'"
      />
      <q-btn
        rounded
        :class="{ 'text-white bg-grey-5': tab === 'history' }"
        label="历史记录"
        @click="tab = 'history'"
      />
    </q-btn-group>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="playlist" class="q-pa-none">
      <q-scroll-area :visible="false" style="width: 100%; height: 76vh">
        <q-list v-if="playlist.length > 0" bordered dense>
          <q-item
            class="text-caption"
            v-for="(item, index) in playlist"
            :key="index"
            clickable
          >
            <q-item-section no-wrap class="q-pa-none">
              <div class="flex items-center">
                {{ item.name }}
                <q-icon
                  v-if="item.st === 0"
                  size="sm"
                  color="primary"
                  name="iconSQ"
                />
                <q-icon
                  v-if="item.mv"
                  size="md"
                  color="primary"
                  name="iconmv"
                />
              </div>
            </q-item-section>
            <q-item-section no-wrap class="artists-name q-pa-none">
              {{ getArtists(item.ar) }}
            </q-item-section>
            <q-item-section no-wrap class="artists-name q-pa-none">
              <q-icon name="print" />
            </q-item-section>
            <q-item-section no-wrap class="artists-name q-pa-none">
              {{ durationTime(item.dt) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-tab-panel>
    <q-tab-panel name="history">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ISongInfo, Ar } from 'src/api/player/playlist.model';
export default defineComponent({
  setup() {
    const $s = useStore();
    return {
      playlist: computed((): ISongInfo[] => {
        console.log('vuex变化', $s.state.player.playlist);
        return $s.state.player.playlist;
      }),
      tab: ref('playlist'),
      getArtists: function getArtists(artists: Ar[]) {
        return artists.reduce((pre, cur, i) => {
          if (i === 0) return cur.name;
          return `${pre}/${cur.name}`;
        }, '');
      },
      durationTime: function (t: number) {
        let minutes = Math.floor(t / 1000 / 60);
        let second = Math.floor((t - minutes * 1000 * 60) / 1000);
        return `${minutes >= 10 ? minutes : '0' + minutes}:${
          second >= 10 ? second : '0' + second
        }`;
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.artists-name {
  color: #bbb;
}
.artists-name:hover {
  color: #000;
}
</style>
