<template>
  <div class="text-h6 text-weight-bolder">独家放送 ></div>
  <div class="q-pt-sm row q-gutter-xl">
    <private-content
      class="col"
      v-for="(item, index) in privateContent"
      :key="index"
      :item="item"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import {
  IPrivateConetntList,
  IPrivateConetnt,
} from 'src/api/recommend/recommend.model';
import { getPrivateContent } from 'src/api/recommend';
import PrivateContent from './PrivateContent.vue';
export default defineComponent({
  components: {
    PrivateContent,
  },
  setup() {
    let privateContent = ref<IPrivateConetnt[]>([]);
    async function getList() {
      privateContent.value = await getPrivateContent();
    }
    onMounted(() => {
      getList();
    });
    return {
      privateContent,
    };
  },
});
</script>
