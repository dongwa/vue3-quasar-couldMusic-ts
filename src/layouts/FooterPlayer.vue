<template>
  <q-toolbar>
    <q-card class="full-width" flat>
      <q-card-section class="row justify-between" horizontal>
        <q-card-section horizontal class="col-2 song-info">
          <div v-show="curentPlaySong" class="full-width flex items-center no-wrap">
            <q-avatar rounded size="50px" class="q-mr-sm">
              <img :src="curentPlaySong?.al.picUrl" />
            </q-avatar>
            <div class="full-width column">
              <div class="full-width text-weight-bold ellipsis max-w">{{ curentPlaySong?.name }}</div>
              <div class="full-width text-subtitle1 ellipsis max-w">{{ artistsNames }}</div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="cloumn col-6 items-center">
          <div class="row justify-center q-gutter-md">
            <q-btn
              :disable="!curentPlaySong"
              round
              flat
              :icon="playMode.icon"
              @click="player.changePlayMode()"
            >
              <q-tooltip>{{ playMode.lebal }}</q-tooltip>
            </q-btn>
            <q-btn
              :disable="!curentPlaySong"
              round
              flat
              icon="skip_previous"
              @click="player.setPreviousSong()"
            />
            <q-btn
              :disable="!playSongUrlInfo"
              round
              flat
              :icon="playing ? 'stop' : 'play_arrow'"
              @click="handlePlayOrPause"
            />
            <q-btn
              :disable="!curentPlaySong"
              round
              flat
              icon="skip_next"
              @click="player.setNextSong()"
            />
            <q-btn :disable="!curentPlaySong" round flat label="词" @click="onClick" />
          </div>
          <div class="flex no-wrap items-center">
            <div v-if="curentPlaySong" class="play-time">{{ curTimeStr }}</div>
            <q-slider
              class="q-mx-sm"
              thumb-size="10px"
              v-model="progress"
              @change="updateProgress"
              :step="1"
              :min="0"
              :max="Math.ceil(playerAudio?.duration || 100000)"
            />
            <div v-if="curentPlaySong" class="play-time">{{ timeLen }}</div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right" class="flex items-center">
            <audio
              :src="playSongUrlInfo?.url"
              ref="playerAudio"
              autoplay
              @timeupdate="timeupdate"
              @playing="onPlaying"
              @ended="ended"
            ></audio>
            <q-btn flat round icon="queue_music" @click="layout.togglerightDrawerOpen" />
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-toolbar>
</template>
<script lang="ts" setup>
import { computed, Ref, ref, watchEffect } from 'vue';
import { useLayoutStore, usePlayerStore } from 'src/stores';
import { getPlayUrl } from 'src/api/player/index';
import { IPlayUrl } from 'src/api/player/player.model';
const layout = useLayoutStore();
const player = usePlayerStore();
let curentPlaySong = ref(computed(() => player.curentPlaySong));
let playSongUrlInfo = ref<IPlayUrl>();

const timeFormat = (t: Ref<number>) => {
  return computed(() => {
    let m = Math.floor(t.value / 60);
    let second = t.value - m * 60;
    return `${m}:${second}`;
  });
};

let playerAudio = ref<HTMLAudioElement>();
let playing = ref(false);
let progress = ref(0);

let timeLen = timeFormat(
  ref(Math.ceil((curentPlaySong.value?.dt as number) / 1000))
);

let curTimeStr = timeFormat(progress);

//监听当前播放歌曲变化
watchEffect(async () => {
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

function onPlaying() {
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

const updateProgress = (e: number) => {
  if (playerAudio.value) {
    playerAudio.value.currentTime = e;
  }
};

const timeupdate = (e: Event) => {
  progress.value = Math.ceil((e.target as HTMLAudioElement).currentTime);
};

const ended = () => {
  player.setNextSong();
};

let playMode = computed(() => {
  let table: {
    [k in typeof player.playMode]: { lebal: string; icon: string };
  } = {
    0: { lebal: '循环播放', icon: 'loop' },
    1: { lebal: '顺序播放', icon: 'earbuds' },
    2: { lebal: '随机播放', icon: 'shuffle' },
  };
  return table[player.playMode];
});
</script>
<style lang="scss" scoped>
.play-time {
  margin: 0 5px;
}
</style>
