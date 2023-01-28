<template>
  <div class="text-h6 text-weight-bolder">独家放送 ></div>
  <div class="q-pt-sm row q-gutter-xl">
    <PrivateContent class="col" v-for="(item, index) in privateContent" :key="index" :item="item" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { IPrivateConetnt } from 'src/api/recommend/recommend.model';
import { getPrivateContent } from 'src/api/recommend';
import PrivateContent from './PrivateContent.vue';

let privateContent = ref<IPrivateConetnt[]>([]);
async function getList() {
  privateContent.value = await getPrivateContent();
}
onMounted(() => {
  getList();
});
</script>
