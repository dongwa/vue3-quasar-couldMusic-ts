<template>
  <div class="search-list" v-show="!loading">
    <div>searchVal:{{ searchVal }}</div>
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
  <q-inner-loading :showing="loading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>
<script lang="ts" setup>
import { getSearchList, ICommonSearch } from 'src/api/search';
import { watch, inject, reactive, ref } from 'vue';
type orderType = Exclude<keyof ICommonSearch, 'order'>;
type table = Record<orderType, { label: string; icon: string }>;

const Nametabel: table = {
  songs: { label: '单曲', icon: 'music_note' },
  artists: { label: '歌手', icon: 'face' },
  albums: { label: '专辑', icon: 'album' },
  playlists: { label: '歌单', icon: '' },
};

let searchVal = inject('searchVal') as string;
let order = ref([] as orderType[]);
let searchList = reactive({} as ICommonSearch);
let loading = ref(false);

watch(
  () => searchVal,
  async (newVal: string) => {
    loading.value = true;
    const res = await getSearchList(newVal);
    if (res) {
      searchList = res;
      order.value = res.order;
    }
    loading.value = false;
  }
);

function getCategory(val: orderType, icon?: boolean): string {
  return icon ? Nametabel[val].icon : Nametabel[val].label;
}
function getList(val: orderType): any {
  console.log('getList===》', val, searchList[val]);

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
  let replaceReg = new RegExp(searchVal, 'g');
  // 高亮替换v-html值
  let replaceString =
    '<span style="color: #5480b1 !important;">' + searchVal + '</span>';
  // 开始替换
  str = str.replace(replaceReg, replaceString);
  return str;
}
</script>
<style lang="scss"></style>
