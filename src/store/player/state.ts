import { ISong } from 'src/api/player/player.model';
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

function state(): IPlayerState {
  return {
    playMode: 0,
    curentPlaySong: null,
    playlist: [],
  };
}

export default state;
