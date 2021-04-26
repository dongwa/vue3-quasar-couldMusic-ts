//歌单信息（用户首页推荐歌单）
export interface IPlayListInfo {
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

//独家内容信息（用于首页独家放送）
export interface IPrivateConetnt {
  id: number;
  url: string;
  picUrl: string;
  sPicUrl: string;
  type: number;
  copywriter: string;
  name: string;
  alg: string;
}

export interface IPrivateConetntList {
  result: IPrivateConetnt[];
  more: boolean;
  offset: number;
}

//用于首页最新音乐
export interface INewSongsInfo {
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

interface ISong {
  name: string;
  id: number;
  position: number;
  alias: string[];
  status: number;
  fee: number;
  copyrightId: number;
  disc: string;
  no: number;
  artists: IArtist[];
  album: IAlbum;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  ringtone: string;
  crbt?: any;
  audition?: any;
  copyFrom: string;
  commentThreadId: string;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName?: any;
  sign?: any;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  single: number;
  noCopyrightRcmd?: any;
  hMusic: IHMusic;
  mMusic: IHMusic;
  lMusic: IHMusic;
  bMusic: IHMusic;
  mvid: number;
  rtype: number;
  rurl?: any;
  mp3Url?: any;
  exclusive: boolean;
  privilege: IPrivilege;
}

interface IPrivilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  freeTrialPrivilege: IFreeTrialPrivilege;
  chargeInfoList: IChargeInfoList[];
}

interface IChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}

interface IFreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}

interface IHMusic {
  name?: any;
  id: number;
  size: number;
  extension: string;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

interface IAlbum {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: IArtist;
  songs: any[];
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: IArtist[];
  subType: string;
  transName?: any;
  onSale: boolean;
  mark: number;
  picId_str: string;
}

export interface IArtist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}
