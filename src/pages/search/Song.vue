<template>
  <div>单曲:{{ word }}</div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const word = ref(route.query.word)
</script>
<style lang='scss'>
</style>