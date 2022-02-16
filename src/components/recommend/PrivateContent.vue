<template>
  <q-card square :bordered="false" flat>
    <q-card-section class="q-pa-none">
      <q-img
        class="radius-sm"
        spinner-color="primary"
        :ratio="6 / 3"
        :src="item.picUrl"
      >
        <div class="absolute-top-left caption flex items-center text-caption">
          <q-icon size="sm" name="play_arrow" />
        </div>
      </q-img>
    </q-card-section>
    <q-card-section class="q-mt-sm q-pa-none">
      {{ item.name }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IPrivateConetnt } from 'src/api/recommend/recommend.model';
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IPrivateConetnt>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.caption {
  border: solid 1px #ccc;
  border-radius: 50%;
  background: rgba(199, 195, 191, 0.3);
  padding: 0;
  margin: 2px 4px 0 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
