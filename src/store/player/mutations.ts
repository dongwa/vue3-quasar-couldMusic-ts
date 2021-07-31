import { ISongInfo } from './../../api/player/playlist.model';
import { MutationTree } from 'vuex';
import { EPlayMode, IPlayerState } from './state';

const mutation: MutationTree<IPlayerState> = {
  setPlaylist(state: IPlayerState, data: ISongInfo[]) {
    state.playlist = data;
  },
  setPlayMode(state: IPlayerState, data: EPlayMode) {
    state.playMode = data;
  },
  setCurentPlaySong(state: IPlayerState, data: ISongInfo) {
    state.curentPlaySong = data;
  },
};

export default mutation;
