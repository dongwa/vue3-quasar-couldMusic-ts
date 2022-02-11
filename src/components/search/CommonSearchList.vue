<template>
  <div class="search-list">
    <div class="title">
      搜'<span class="sp">{{ searchVal }}</span
      >'相关的结果>
    </div>
    <q-list dense v-for="(category, index) in order" :key="index">
      <div class="sub-title">
        <q-icon size="xs" class="q-mr-xs" :name="getCategory(category, true)" />
        {{ getCategory(category) }}
      </div>
      <q-item
        clickable
        v-ripple
        v-for="item in getList(category)"
        :key="item.id"
      >
        <q-item-section no-wrap class="ellipsis">
          <div class="ellipsis" v-html="getItemInfo(category, item)"></div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script lang="ts" setup>
import { getSearchList } from 'src/api/search';
import { inject, reactive, ref } from 'vue';

const props = defineProps({
  searchVal: {
    type: String,
    required: true,
  },
  order: {
    type: Object,
  },
});

const Nametabel = {
  songs: '单曲',
  artists: '歌手',
  albums: '专辑',
};
const iconTable = {
  songs: 'music_note',
  artists: 'face',
  albums: 'album',
};
let searchList = inject('searchList');
let order = inject('order');

function getCategory(val: keyof typeof Nametabel, icon?: boolean): string {
  return icon ? iconTable[val] : Nametabel[val];
}
function getList(val: string): any {
  return searchList[val];
}
function getArtistName(category: string, item: any) {
  if (category === 'artists') return '';
  return item.artists ? item.artists[0].name : item.artist.name;
}
function getItemInfo(category: string, item: any) {
  let ArtistNam: string = getArtistName(category, item);
  // 原始字符串
  let str = `${item.name as string}-${ArtistNam}`;
  //将关键字高亮
  let replaceReg = new RegExp(searchVal.value, 'g');
  // 高亮替换v-html值
  let replaceString =
    '<span style="color: #5480b1 !important;">' + searchVal.value + '</span>';
  // 开始替换
  str = str.replace(replaceReg, replaceString);
  return str;
}
</script>
<style lang="scss"></style>
