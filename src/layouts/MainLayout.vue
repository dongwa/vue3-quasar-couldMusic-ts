<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white header">
      <q-toolbar>
        <!-- logo和标题 -->
        <q-toolbar-title class="q-mr-xl cursor-pointer" shrink>
          <q-icon size="lg" name="track_changes" />
          网抑云音乐
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
        <q-avatar
          v-if="!$store.state.auth.isLogin"
          size="70px"
          icon="account_circle"
          @click="$store.commit('layout/toggleLoginForm', true)"
        >
        </q-avatar>
        <q-avatar v-else size="70px" :icon="getAvatar" />
        <span class="cursor-pointer btn-login">
          {{
            $store.state.auth.isLogin
              ? $store.state.auth.userInfo.nickname
              : '未登录'
          }}
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
        />
        <q-btn
          round
          size="sm"
          flat
          color="grey-1"
          class="q-ml-sm"
          icon="palette"
        />
        <q-btn
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
    <q-drawer
      v-model="$store.state.layout.leftDrawerOpen"
      side="left"
      bordered
      behavior="desktop"
      :width="230"
    >
      <SideBar />
    </q-drawer>
    <!-- 右边抽屉，只在点击当前歌单按钮时展开 -->
    <q-drawer
      v-model="$store.state.layout.rightDrawerOpen"
      side="right"
      overlay
      bordered
      :width="400"
    >
      <right-drawer />
    </q-drawer>
    <!-- 主页面 -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- 登录框 -->
    <q-dialog v-model="$store.state.layout.loginFormSwitch" persistent>
      <login />
    </q-dialog>
    <!-- 页脚，播放器 -->
    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="more_vert"
          @click="$store.commit('layout/togglerightDrawerOpen')"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SideBar from './SideBar.vue';
import Search from 'components/layoutComponents/Search.vue';
import Login from 'components/auth/LoginForm.vue';
import RightDrawer from './RightDrawer.vue';
export default defineComponent({
  components: { Search, SideBar, Login, RightDrawer },
  setup() {
    const $router = useRouter();
    const $store = useStore();
    const goBack = () => {
      $router.go(-1);
    };
    return {
      searchVal: ref(''),
      goBack,
      getAvatar: computed(() => `img:${$store.state.auth.userInfo.avatarUrl}`),
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
