import { defineStore } from 'pinia';
import { ISongInfo } from 'src/api/player/playlist.model';

//播放方式
export enum EPlayMode {
  Sequence = 1,
  circulation = 0,
  random = 2,
}
export interface IPlayerState {
  playMode: EPlayMode;
  curentPlaySong: ISongInfo | null; //当前播放的歌曲
  playlist: ISongInfo[]; //播放列表
}

export const usePlayerStore = defineStore('player', {
  state: (): IPlayerState => ({
    playMode: 0,
    curentPlaySong: null,
    playlist: [],
  }),
  actions: {
    setPlaylist(data: ISongInfo[]) {
      this.playlist = data;
    },
    setPlayMode(data: EPlayMode) {
      this.playMode = data;
    },
    setCurentPlaySong(data: ISongInfo) {
      this.curentPlaySong = data;
    },
  },
});

export type PlayerStore = ReturnType<typeof usePlayerStore>;
