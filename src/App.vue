<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
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
