import { api } from 'src/api/axios';

export enum PlayerApiUrl {
  playlist = '/playlist/detail', //传入歌单id获取歌单信息
  songDetail = '/song/detail', //传入歌曲id可以获取歌曲信息，可同时传入多个id用逗号分隔
  playUrl = '/song/url', //传入歌曲id获取播放连接
}

export const getPlaylistInfoById = async (id: number) => {
  const res = await api.get(`${PlayerApiUrl.playlist}?id=${id}`);
  return res.data.playlist as IPlaylistDetail;
};
export const getPlaylist = async (ids: string) => {
  const res = await api.get(`${PlayerApiUrl.songDetail}?ids=${ids}`);
  return res.data.songs as ISongInfo[];
};

export const getPlayUrl = async (id: number): Promise<IPlayUrl> => {
  const res = await api.get(`${PlayerApiUrl.playUrl}?id=${id}`);
  return res.data.data[0];
};
