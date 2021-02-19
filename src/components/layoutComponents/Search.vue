<template>
  <div>
    <q-input
      dense
      rounded
      standout="bg-red-7"
      input-class="text-white"
      class="q-ml-md"
      placeholder="搜索"
      v-model="searchVal"
      @update:modelValue="fetchSearchList()"
      @focus="togglePopup = true"
      @blur="togglePopup = false"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="white" />
      </template>
      <div class="list-container" v-show="togglePopup">
        <!-- 热搜 -->
        <HotSearchList v-if="searchVal === ''" />
        <!-- 普通搜索 -->
        <div class="search-list" v-else>
          <div class="title">
            搜'<span class="sp">{{ searchVal }}</span
            >'相关的结果>
          </div>
          <q-list dense v-for="(category, index) in order" :key="index">
            <div class="sub-title">
              <q-icon
                size="xs"
                class="q-mr-xs"
                :name="getCategory(category, true)"
              />
              {{ getCategory(category) }}
            </div>
            <q-item
              clickable
              v-ripple
              v-for="item in getList(category)"
              :key="item.id"
            >
              <q-item-section>
                <div v-html="getItemInfo(category, item)"></div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-input>
  </div>
</template>
<script lang="ts">
import { api } from '../../boot/axios';
import { defineComponent, ref, reactive } from 'vue';
import HotSearchList from './HotSearchList.vue';
export default defineComponent({
  components: {
    HotSearchList,
  },
  setup() {
    let searchVal = ref('');
    let togglePopup = ref(false);
    let searchList: mytable = reactive({});
    let order = ref([]);
    function fetchSearchList() {
      api
        .get(`/search/suggest?keywords=${searchVal.value}`)
        .then((res: any) => {
          searchList = res.result;
          order.value = res.result.order;
          // console.log('更新数据', searchList, order);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //加个接口才能用方括号访问属性
    interface mytable {
      [index: string]: string;
    }
    function getCategory(val: string, icon?: boolean): string {
      let Nametabel: mytable = {
        songs: '单曲',
        artists: '歌手',
        albums: '专辑',
      };
      let iconTable: mytable = {
        songs: 'music_note',
        artists: 'face',
        albums: 'album',
      };
      return icon ? iconTable[val] : Nametabel[val]; //ts竟然不可以通过[]访问属性。。。。
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
        '<span style="color: #5480b1 !important;">' +
        searchVal.value +
        '</span>';
      // 开始替换
      str = str.replace(replaceReg, replaceString);
      return str;
    }
    return {
      searchVal,
      fetchSearchList,
      togglePopup,
      searchList,
      order,
      getCategory,
      getList,
      getArtistName,
      getItemInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.list-container {
  position: absolute;
  width: 300px;
  height: 520px;
  overflow: scroll;
  top: 40px;
  left: -50px;
  z-index: 999;
  background: #fff;
  border: 2px solid #f4f4f4;
  border-radius: 10px;
}
.sp {
  color: #5480b1 !important;
}
.search-list {
  overflow: auto;
  overflow-x: hidden;
  font-size: 12px;
  color: #333;
  .title {
    margin: 5px 5px;
  }
  .sub-title {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 5px;
    line-height: 28px;
    background: #f4f4f4;
  }
}
</style>
