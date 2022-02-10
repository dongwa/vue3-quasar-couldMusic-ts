import {
  IBannerInfo,
  IPrivateConetnt,
  IPrivateConetntList,
  IPlayListInfo,
  INewSongsInfo,
} from './recommend.model';
import { api } from '../../boot/axios';

enum RecommendApiUrl {
  getBanners = '/banner',
  recommendPlayList = '/personalized',
  privateContent = '/personalized/privatecontent',
  privatecontentList = '/personalized/privatecontent/list',
  newSongs = '/personalized/newsong',
}
/**
 * 返回首页banner数据
 * @param type 资源类型,对应以下类型,默认为 0 即PC
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 */
export const getBanners = async (type = 0): Promise<IBannerInfo[]> => {
  const res: IBannerInfo[] = (
    (await api.get(`${RecommendApiUrl.getBanners}?type=${type}`)) as any
  ).banners;
  return res;
};

export const getRecommendPlayList = async (
  limit = 9
): Promise<IPlayListInfo[]> => {
  const res: IPlayListInfo[] = (
    (await api.get(
      `${RecommendApiUrl.recommendPlayList}?limit=${limit}`
    )) as any
  ).result;
  return res;
};

//返回入口列表的三个独家内容
export const getPrivateContent = async (): Promise<IPrivateConetnt[]> => {
  const res: IPrivateConetnt[] = (
    (await api.get(`${RecommendApiUrl.privateContent}`)) as any
  ).result;
  return res;
};
/**
 * 返回独家内容列表
 * @param limit 每次请求的数量
 * @param offset 偏移量，用于分页，相当于页数
 */
export const getPrivateContentList = async (
  limit: number,
  offset: number
): Promise<IPrivateConetntList> => {
  const res: IPrivateConetntList = await api.get(
    `${RecommendApiUrl.privatecontentList}?limit=${limit}&offset=${offset}`
  );
  return res;
};
//返回新歌推荐
export const getNewSongs = async (limit: number): Promise<INewSongsInfo[]> => {
  const res: INewSongsInfo[] = (
    (await api(`${RecommendApiUrl.newSongs}?limit=${limit}`)) as any
  ).result;
  return res;
};
