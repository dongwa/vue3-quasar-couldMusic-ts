import { Ar } from 'src/api/player/playlist.model';

export function useSongInfo() {
  function formatArtistsName(artists: Ar[]) {
    return artists.reduce((pre, cur, i) => {
      if (i === 0) return cur.name;
      return `${pre}/${cur.name}`;
    }, '');
  }
  function durationTime(t: number) {
    let minutes = Math.floor(t / 1000 / 60);
    let second = Math.floor((t - minutes * 1000 * 60) / 1000);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      second >= 10 ? second : '0' + second
    }`;
  }
  return {
    formatArtistsName,
    durationTime,
  };
}
