<script lang="ts" setup>
const fetchStore = useFetchStore();

fetchStore.errors = {
  log: {
    text: ["error found"],
  },
};
</script>
<template>
  <div>
    <UErrorText error="log|text" />
  </div>
</template>
