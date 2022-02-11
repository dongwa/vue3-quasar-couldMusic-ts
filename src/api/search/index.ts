import { api } from '../../boot/axios';
import { hotSearchItem } from './search.model';
export * from './search.model';
export async function getSearchList(keywords: string) {
  const res = await api.get(`/search/suggest?keywords=${keywords}`);
  return res.data.result;
}

export async function getHotSearch(): Promise<hotSearchItem[]> {
  const res = await api.get('/search/hot/detail');
  return res.data.data;
}
