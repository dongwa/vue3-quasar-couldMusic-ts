import { IAlbum, ISong } from '../player/player.model';

export interface hotSearchItem {
  alg: string;
  content: string;
  iconType: number;
  iconUrl: string;
  score: number;
  searchWord: string;
  source: number;
  url: string;
}

export interface ICommonSearch {
  albums: IAlbum[];
  order: string[];
  songs: ISong[];
}
