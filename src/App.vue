<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { useQuasar } from 'quasar';
import { Ar } from './api/player/playlist.model';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    function getArtists(artists: Ar[]) {
      return artists.reduce((pre, cur, i) => {
        if (i === 0) return cur.name;
        return `${pre}/${cur.name}`;
      }, '');
    }
    provide('getArtists', getArtists);
    //添加iconfont图标映射
    $q.iconMapFn = (iconName) => {
      if (iconName.startsWith('icon') === true) {
        // we strip the "app:" part
        return {
          cls: 'icon iconfont ' + iconName,
        };
      }
    };
  },
});
</script>
