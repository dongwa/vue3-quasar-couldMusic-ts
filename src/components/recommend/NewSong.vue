<template>
  <div class="text-h6 text-weight-bolder">最新音乐 ></div>
  <div class="column q-gutter-x-sm" style="height: 300px">
    <!-- <q-list bordered> -->
    <q-item
      class="songItem col-3 q-pa-none"
      dense
      v-for="(item, index) in songList"
      :key="index"
      clickable
      v-ripple
    >
      <q-item-section avatar class="q-pa-none">
        <q-img
          class="radius-sm"
          color="primary"
          spinner-color="primary"
          :src="item.picUrl"
        >
          <div class="absolute-center caption">
            <q-btn size="xs" round color="white">
              <q-icon color="primary" name="play_arrow" />
            </q-btn>
          </div>
        </q-img>
      </q-item-section>
      <q-item-section class="q-pa-none q-ml-sm column">
        <div>
          {{ item.name }}
        </div>
        <div class="artists-name text-caption">
          <q-icon
            v-if="item.song.album.status === 0"
            size="sm"
            color="primary"
            name="iconSQ"
          />
          <q-icon
            v-if="item.song.mvid"
            size="md"
            color="primary"
            name="iconmv"
          />
          {{ getArtists(item.song.artists) }}
        </div>
      </q-item-section>
    </q-item>
    <!-- </q-list> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { INewSongsInfo } from 'src/api/recommend/recommend.model';
import { getNewSongs } from 'src/api/recommend';
import { IArtist } from 'src/api/player/player.model';
export default defineComponent({
  setup() {
    let songList = ref<INewSongsInfo[]>([]);
    async function getNewSongList() {
      songList.value = await getNewSongs(12);
    }
    function getArtists(artists: IArtist[]) {
      return artists.reduce((pre, cur, i) => {
        if (i === 0) return cur.name;
        return `${pre}/${cur.name}`;
      }, '');
    }
    onMounted(() => {
      getNewSongList();
    });
    return {
      songList,
      getArtists,
    };
  },
});
</script>
<style lang="scss" scoped>
.caption {
  background: transparent;
}
.songItem {
  height: 56px;
  margin-bottom: 10px;
}
.artists-name {
  color: #bbb;
}
</style>
