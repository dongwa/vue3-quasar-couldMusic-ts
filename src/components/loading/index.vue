<template>
  <q-inner-loading :showing="loading">
    <q-spinner-bars size="50px" color="primary" />
  </q-inner-loading>
</template>
<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
