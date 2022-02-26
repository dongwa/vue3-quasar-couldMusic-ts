<template>
  <q-page padding>
    <div>搜索 {{ word }}</div>
    <q-toolbar class="bg-white">
      <q-tabs indicator-color="primary" narrow-indicator align="left">
        <q-route-tab
          class="text-h6 text-weight-bolder"
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :to="item.to"
          active-class="tab-actived"
          exact-active-class="tab-actived"
          exact
        />
      </q-tabs>
    </q-toolbar>
    <router-view></router-view>
  </q-page>
</template>
<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute()

const word = ref(router.query.word)
console.log(word.value);

const tabList = reactive([
  { label: '单曲', to: '/home/recommend' },
  { label: '歌手', to: '/home/song' },
  { label: '专辑', to: '/home/station' },
  { label: '视频', to: '/home/rank' },
  { label: '歌单', to: '/home/singer' },
  { label: '歌词', to: '/home/new' },
  { label: '博客', to: '/home/new' },
  { label: '声音', to: '/home/new' },
  { label: '用户', to: '/home/new' },
]);
</script>
<style lang='scss'>
</style>