<template>
  <q-layout view="hHh Lpr lFr">
    <q-header class="bg-primary text-white header">
      <q-toolbar>
        <!-- logo和标题 -->
        <q-toolbar-title class="q-mr-xl cursor-pointer" shrink>
          <q-icon size="lg" name="track_changes" />
          网抑音乐
        </q-toolbar-title>
        <!-- 前进后退按钮 -->
        <q-btn
          round
          size="sm"
          class="q-mx-sm"
          flat
          color="white"
          glossy
          icon="keyboard_arrow_left"
          @click="goBack"
        />
        <q-btn
          round
          size="sm"
          flat
          color="white"
          glossy
          icon="keyboard_arrow_right"
        />
        <!-- 搜索框 -->
        <Search />
        <!-- 听歌识曲按钮 -->
        <q-btn
          round
          size="md"
          flat
          color="grey-1"
          class="q-ml-md bg-red-7"
          icon="keyboard_voice"
        />
        <!-- 头像登录等 -->
        <q-space />
        <q-avatar size="70px" icon="account_circle"> </q-avatar>
        <span class="cursor-pointer btn-login">
          未登录
          <q-icon name="arrow_drop_down" />
        </span>
        <!-- 设置，主题和消息按钮 -->
        <q-btn
          round
          size="sm"
          flat
          color="grey-1"
          class="q-ml-sm"
          icon="settings"
        /><q-btn
          round
          size="sm"
          flat
          color="grey-1"
          class="q-ml-sm"
          icon="palette"
        /><q-btn
          round
          size="sm"
          flat
          color="grey-1"
          class="q-ml-sm"
          icon="comment"
        />
        <!-- 分割线，最小/大化，关闭 -->
        <q-separator spaced inset vertical dark />
        <q-btn dense flat icon="remove" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" />
      </q-toolbar>
    </q-header>
    <!-- 左边抽屉 -->
    <q-drawer v-model="left" side="left" overlay behavior="desktop" width="200">
      <SideBar />
    </q-drawer>
    <!-- 主页面 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import SideBar from './SideBar.vue';
import Search from 'components/layoutComponents/Search.vue';
export default defineComponent({
  components: { Search, SideBar },
  setup() {
    const $router = useRouter();
    const goBack = () => {
      $router.go(-1);
    };
    return {
      goBack,
    };
  },
  data() {
    return {
      left: true,
      searchVal: '',
    };
  },
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  height: $header-height;
}
.btn-login {
  font-size: 11px;
  color: $header-text-color;
}
.btn-login:hover {
  color: white;
}
</style>
