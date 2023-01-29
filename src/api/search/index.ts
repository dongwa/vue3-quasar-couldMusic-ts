import { api } from '../axios';

enum SearchApi {
  keywordsSearch = '/cloudsearch',
}

/** 根据关键字搜索
 * @param limit 表示数量，默认30
 * @param offset 偏移量，用于分页，默认为0
 * @param type 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
 * 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
 */
export async function searchBykeywords(
  keyword: string,
  limit = 30,
  offset = 0,
  type = 1
) {
  const res = await api.get(
    `${SearchApi.keywordsSearch}?keywords=${keyword}&offset=${offset}&limit=${limit}&type=${type}`
  );
  return res.data;
}

/** 根据关键词获取列表，可用于首页搜索框卡片上的搜索 */
export async function getSearchList(keywords: string) {
  const res = await api.get(`/search/suggest?keywords=${keywords}`);
  return res.data.result;
}

/** 获取热搜，可用于首页搜索框的默认搜索 */
export async function getHotSearch(): Promise<hotSearchItem[]> {
  const res = await api.get('/search/hot/detail');
  return res.data.data;
}
