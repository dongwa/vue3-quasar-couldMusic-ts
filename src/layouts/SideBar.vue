<template>
  <q-list class="q-mx-sm q-mt-sm sidebar-list" dense>
    <q-item clickable v-ripple to="/" exact active-class="active-class">
      <q-item-section class="sidebar-item">发现音乐</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/friends" exact active-class="active-class">
      <q-item-section class="sidebar-item">朋友</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/live" exact active-class="active-class">
      <q-item-section class="sidebar-item">直播</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/FM" exact active-class="active-class">
      <q-item-section class="sidebar-item">私人FM</q-item-section>
    </q-item>
    <q-item class="sub-title">
      <q-item-section> 我的音乐 </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/local" exact active-class="active-class">
      <q-item-section side>
        <q-icon size="xs" name="library_music" />
      </q-item-section>
      <q-item-section class="sidebar-item">本地音乐</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/download" exact active-class="active-class">
      <q-item-section side>
        <q-icon size="xs" name="cloud_download" />
      </q-item-section>

      <q-item-section class="sidebar-item">下载管理</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="sub-title">
        <div>
          创建的歌单
          <q-icon
            v-ripple
            @click="isExpand = !isExpand"
            :class="['arrow_drop_down', { 'rotate-270': isExpand }]"
            name="arrow_drop_down"
          />
        </div>
      </q-item-section>
      <q-item-section side>
        <q-icon size="xs" name="add" />
      </q-item-section>
    </q-item>
  </q-list>
  <!-- 创建的音乐菜单扩展 -->
  <q-list v-show="isExpand" class="sidebar-list q-mx-xs" dense>
    <q-item clickable to="/favorite" exact active-class="active-class">
      <q-item-section side>
        <q-icon size="sm" name="favorite_border" />
      </q-item-section>
      <q-item-section class="sidebar-item"> 我喜欢的音乐 </q-item-section>
      <q-item-section side>
        <q-btn icon="favorite" outline size="xs" rounded />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let isExpand = ref(false);
    return { isExpand };
  },
});
</script>
<style lang="scss" scoped>
.active-class {
  font-size: 18px;
  font-weight: bold;
  background: rgb(247, 247, 247);
}
.sidebar-list {
  .sidebar-item {
    font-size: 14px;
    line-height: 36px;
    color: #444;
    border-radius: 4px;
  }
  .sub-title {
    font-size: 12px;
    line-height: 36px;
    color: #bbb;
    cursor: pointer;
  }
  .arrow_drop_down:hover {
    color: #000;
  }
}
</style>
