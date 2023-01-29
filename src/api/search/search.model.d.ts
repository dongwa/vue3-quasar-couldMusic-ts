declare interface hotSearchItem {
  alg: string;
  content: string;
  iconType: number;
  iconUrl: string;
  score: number;
  searchWord: string;
  source: number;
  url: string;
}

declare interface ICommonSearch {
  albums?: IAlbum[];
  songs?: ISong[];
  artists?: IArtist[];
  playlists?: any[];
  order?: string[];
}
