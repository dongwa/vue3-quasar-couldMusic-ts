//歌单信息（用户首页推荐歌单）
declare interface IPlayListInfo {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: string;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}
//首页banner信息
declare interface IBannerInfo {
  // adDispatchJson: null;
  // adLocation: null;
  // adSource: null;
  // adid: null;
  // event: null;
  // extMonitor: null;
  // extMonitorInfo: null;
  // monitorBlackList: null;
  // monitorClick: null;
  // monitorClickList: null;
  // monitorImpress: null;
  // monitorImpressList: null;
  // monitorType: null;
  // program: null;
  // song: null;
  // url: null;
  // video: null;
  encodeId: string;
  exclusive: boolean;
  imageUrl: string;
  scm: string;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
}

//独家内容信息（用于首页独家放送）
declare interface IPrivateConetnt {
  id: number;
  url: string;
  picUrl: string;
  sPicUrl: string;
  type: number;
  copywriter: string;
  name: string;
  alg: string;
}

declare interface IPrivateConetntList {
  result: IPrivateConetnt[];
  more: boolean;
  offset: number;
}

//用于首页最新音乐
declare interface INewSongsInfo {
  id: number;
  type: number;
  name: string;
  copywriter?: any;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime?: any;
  song: ISong;
  alg: string;
}
