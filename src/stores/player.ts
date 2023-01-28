import { defineStore } from 'pinia';
import { ISongInfo } from 'src/api/player/playlist.model';

//播放方式
export enum PlayMode {
  circulation = 0, //循环
  Sequence = 1, // 顺序
  random = 2, //随机
}
export interface IPlayerState {
  playMode: PlayMode;
  index: number;
  curentPlaySong: ISongInfo | null; //当前播放的歌曲
  playlist: ISongInfo[]; //播放列表
  history: number[];
}

export const usePlayerStore = defineStore('player', {
  state: (): IPlayerState => ({
    playMode: 1,
    index: 0,
    curentPlaySong: null,
    playlist: [],
    history: [],
  }),
  actions: {
    setPlaylist(data: ISongInfo[]) {
      this.playlist = data;
      this.history = [];
    },
    changePlayMode() {
      this.playMode = (this.playMode + 1) % 3;
    },
    setCurentPlaySong(data: ISongInfo, index: number) {
      this.curentPlaySong = data;
      this.index = index;
      this.history.push(index);
    },

    /** 上一首 */
    setPreviousSong() {
      this.history.pop();
      let index = this.history.pop();
      /** 若历史列表中没有上一曲了，则随机播放 */
      if (!index) {
        const len = this.playlist.length;
        index = Math.floor(Math.random() * (len + 1));
      }
      this.curentPlaySong = this.playlist[index];
    },
    /** 下一首 */
    setNextSong() {
      if (this.playMode > 1)
        this.index = Math.floor(Math.random() * (this.playlist.length + 1));
      else this.index += this.playMode;
      this.curentPlaySong = this.playlist[this.index];
      this.history.push(this.index);
    },
  },
  persist: true,
});

export type PlayerStore = ReturnType<typeof usePlayerStore>;
