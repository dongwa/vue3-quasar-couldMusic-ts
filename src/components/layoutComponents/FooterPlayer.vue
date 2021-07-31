<template>
  <q-toolbar>
    <q-card class="full-width" flat>
      <q-card-section horizontal>
        <q-card-section
          horizontal
          class="flex items-center"
          v-if="curentPlaySong"
        >
          <q-avatar>
            <img :src="curentPlaySong.al.picUrl" />
          </q-avatar>
          <div class="text-h6">{{ curentPlaySong.name }}</div>
          <div class="text-subtitle2">{{ artistsName }}</div>
        </q-card-section>
        <q-card-section class="flex items-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right" class="flex items-center">
            <q-btn flat label="Action 1" />
            <q-btn flat label="Action 2" />
            <q-btn
              flat
              round
              dense
              icon="more_vert"
              @click="$store.commit('layout/togglerightDrawerOpen')"
            />
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { ISongInfo, Ar } from 'src/api/player/playlist.model';
import { ISong } from 'src/api/player/player.model';
import { useSongInfo } from '../hooks/useSongInfo';
import { IPlayerState } from 'src/store/player/state';
import { StateInterface } from 'src/store';
export default defineComponent({
  setup() {
    const $s = useStore<StateInterface>();
    let curentPlaySong = reactive<ISongInfo | {}>({});
    curentPlaySong = computed(() => $s.state.player.curentPlaySong);
    let artistsName = ref('');
    computed(() => {
      const { formatArtistsName } = useSongInfo();
      if (curentPlaySong === null) return '';
      // artistsName.value = formatArtistsName(curentPlaySong.ar);
    });
    return {
      curentPlaySong,
      artistsName,
    };
  },
});
</script>
