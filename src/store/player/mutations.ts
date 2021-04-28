import { ISong } from 'src/api/player/player.model';
import { MutationTree } from 'vuex';
import { EPlayMode, IPlayerState } from './state';

const mutation: MutationTree<IPlayerState> = {
  setPlaylist(state: IPlayerState, data: ISong[]) {
    state.playlist = data;
  },
  setPlayMode(state: IPlayerState, data: EPlayMode) {
    state.playMode = data;
  },
  setCurentPlaySong(state: IPlayerState, data: ISong) {
    state.curentPlaySong = data;
  },
};

export default mutation;
