import { IBannerInfo, ISongInfo } from './recommend.model';
import { api } from '../../boot/axios';

enum RecommendApiUrl {
  getBanners = '/banner',
  recommendPlayList = '/personalized',
}
/**
 * 返回首页banner数据
 * @param type 资源类型,对应以下类型,默认为 0 即PC
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 */
export const getBanners = async (type: number = 0): Promise<IBannerInfo[]> => {
  let res: IBannerInfo[] = ((await api.get(
    `${RecommendApiUrl.getBanners}?type=${type}`
  )) as any).banners;
  return res;
};

export const getRecommendPlayList = async (
  limit: number = 9
): Promise<ISongInfo[]> => {
  let res: ISongInfo[] = ((await api.get(
    `${RecommendApiUrl.recommendPlayList}?limit=${limit}`
  )) as any).result;
  return res;
};
