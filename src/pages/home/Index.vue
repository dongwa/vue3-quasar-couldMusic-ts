<template>
  <q-page padding>
    <q-page-sticky class="z-max" position="top-left" expand>
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
    </q-page-sticky>
    <router-view class="q-mt-md"></router-view>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const tabList = reactive([
  { label: '个性推荐', to: '/home/recommend' },
  { label: '歌单', to: '/home/song' },
  { label: '主播电台', to: '/home/station' },
  { label: '排行榜', to: '/home/rank' },
  { label: '歌手', to: '/home/singer' },
  { label: '最新音乐', to: '/home/new' },
]);
</script>

<style lang="scss" scoped>
.tab-actived {
  font-weight: 900;
  color: red;
}
.z-max {
  width: 100%;
  z-index: 100 !important;
}
</style>
