<template>
  <q-toolbar>
    <q-card class="full-width" flat>
      <q-card-section class="row justify-between" horizontal>
        <q-card-section horizontal class="col-2 song-info">
          <div
            v-show="curentPlaySong"
            class="full-width flex items-center no-wrap"
          >
            <q-avatar rounded size="50px" class="q-mr-sm">
              <img :src="curentPlaySong?.al.picUrl" />
            </q-avatar>
            <div class="full-width column">
              <div class="full-width text-weight-bold ellipsis max-w">
                {{ curentPlaySong?.name }}
              </div>
              <div class="full-width text-subtitle1 ellipsis max-w">
                {{ artistsNames }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="cloumn col-6 items-center">
          <div class="row justify-center q-gutter-md">
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              icon="repeat"
              @click="onClick"
            />
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              icon="skip_previous"
              @click="onClick"
            />
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              :icon="playing ? 'stop' : 'play_arrow'"
              @click="handlePlayOrPause"
            />
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              icon="skip_next"
              @click="onClick"
            />
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              label="词"
              @click="onClick"
            />
          </div>
          <div class="flex no-wrap">
            <div v-if="playSongUrlInfo" class="play-time">0.00</div>
            <q-linear-progress
              :value="0.5"
              rounded
              color="#ccc"
              track-color="primary"
              class="q-mt-sm"
            />
            <div v-if="curentPlaySong" class="play-time">
              {{ timeLen }}
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right" class="flex items-center">
            <audio
              :src="playSongUrlInfo?.url"
              ref="playerAudio"
              autoplay
              @playing="onPlaying"
            ></audio>
            <q-btn
              flat
              round
              icon="queue_music"
              @click="layout.togglerightDrawerOpen"
            />
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-toolbar>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useLayoutStore, usePlayerStore } from 'src/stores';
import { getPlayUrl } from 'src/api/player/index';
import { IPlayUrl } from 'src/api/player/player.model';
const layout = useLayoutStore();
const player = usePlayerStore();
let curentPlaySong = ref(computed(() => player.curentPlaySong));
let playSongUrlInfo = ref<IPlayUrl>();

let timeLen = computed(() => {
  if (curentPlaySong.value) {
    let s = Math.floor(curentPlaySong.value?.dt / 1000);
    let m = Math.floor(s / 60);
    let second = s - m * 60;
    return `${m}:${second}`;
  }
  return '0:00';
});

//监听当前播放歌曲变化
watch(curentPlaySong, async () => {
  if (curentPlaySong.value) {
    const res = await getPlayUrl(curentPlaySong.value.id);
    playSongUrlInfo.value = res;
  }
});

let artistsNames = computed(() => {
  if (curentPlaySong.value) {
    return curentPlaySong.value.ar.reduce((res, cur) => (res += cur.name), '');
  }
  return '';
});

let playerAudio = ref<HTMLAudioElement>();
let playing = ref(false);

function onPlaying() {
  console.log('on playing');
  playing.value = true;
}

function play() {
  playerAudio.value?.play();
  playing.value = true;
}
function pause() {
  playerAudio.value?.pause();
  playing.value = false;
}
function handlePlayOrPause() {
  playing.value ? pause() : play();
}
function onClick() {
  console.log('');
}
</script>
<style lang="scss" scoped>
.play-time {
  margin: 0 5px;
}
</style>
