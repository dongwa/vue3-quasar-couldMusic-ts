import { api } from 'src/boot/axios';
import { IPlaylistDetail, ISongInfo } from './playlist.model';

export enum PlayerApiUrl {
  playlist = '/playlist/detail', //传入歌单id获取歌单信息
  songDetail = '/song/detail', //传入歌曲id可以获取歌曲信息，可同时传入多个id用逗号分隔
}

export const getPlaylistInfoById = async (id: number) => {
  const res = await api.get(`${PlayerApiUrl.playlist}?id=${id}`);
  return res.data.playlist as IPlaylistDetail;
};
export const getPlaylist = async (ids: string) => {
  const res = await api.get(`${PlayerApiUrl.songDetail}?ids=${ids}`);
  return res.data.songs as ISongInfo[];
};
