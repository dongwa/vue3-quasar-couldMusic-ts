export interface ISongInfo {
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

export interface IBannerInfo {
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
