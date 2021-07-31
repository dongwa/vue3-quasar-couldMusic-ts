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
    <q-tab-panel name="playlist" class="fit q-pa-none">
      <q-virtual-scroll style="max-height: 75vh" :items="playlist">
        <template v-slot="{ item, index }">
          <q-item
            :class="['text-caption row ', { 'bg-grey-2': index % 2 != 0 }]"
            :key="index"
            dense
            clickable
            :active="activeIndex === index"
            @dblclick="changeCurentPlaySong(item, index)"
            active-class="text-primary"
          >
            <q-item-section no-wrap class="q-pa-none col-7">
              <div class="flex items-center fit">
                <div class="w-70 ellipsis">
                  {{ item.name }}
                </div>
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
            <q-item-section no-wrap class="col-2 q-pa-none ellipsis">
              {{ formatArtistsName(item.ar) }}
            </q-item-section>
            <q-item-section no-wrap class="col-1 artists-name q-pa-none">
              <q-icon class="rotate-135" name="link" />
            </q-item-section>
            <q-item-section no-wrap class="col-1 artists-name q-pa-none">
              {{ durationTime(item.dt) }}
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-tab-panel>
    <q-tab-panel name="history">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, computed } from 'vue';
import { ISongInfo } from 'src/api/player/playlist.model';
import { useSongInfo } from 'components/hooks/useSongInfo';
export default defineComponent({
  setup() {
    const $s = useStore();
    let activeIndex = ref(-1);
    const { formatArtistsName, durationTime } = useSongInfo();
    function changeCurentPlaySong(item, index) {
      activeIndex.value = index;
      $s.commit('player/setCurentPlaySong', item);
    }
    return {
      playlist: computed((): ISongInfo[] => {
        console.log('vuex变化', $s.state.player.playlist);
        return $s.state.player.playlist;
      }),
      tab: ref('playlist'),
      activeIndex,
      formatArtistsName,
      durationTime,
      changeCurentPlaySong,
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
.w-70 {
  max-width: 70%;
}
</style>
