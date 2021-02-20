<template>
  <q-page padding>
    <q-tabs indicator-color="primary" narrow-indicator align="left">
      <q-route-tab
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.label"
        :to="item.to"
        active-class="tab-actived"
        exact-active-class="tab-actived"
        exact
      />
    </q-tabs>
    <router-view></router-view>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const tabList = reactive([
      { label: '个性推荐', to: '/recommend' },
      { label: '歌单', to: '/song' },
      { label: '主播电台', to: '/station' },
      { label: '排行榜', to: '/rank' },
      { label: '歌手', to: '/singer' },
      { label: '最新音乐', to: '/new' },
    ]);
    return {
      tabList,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab-actived {
  font-weight: bold;
}
</style>
