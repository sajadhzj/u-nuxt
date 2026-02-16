<script lang="ts" setup>
const rightBool = ref(false);
const leftBool = ref(false);
</script>

<template>
  <div class="p-4">
    <section class="flex gap-3">
      <UButton label="open right" @click="rightBool = !rightBool" />
      <UButton label="open left" @click="leftBool = !leftBool" />
    </section>

    <UDrawer side="right" v-model="rightBool"> right drawer </UDrawer>
    <UDrawer side="left" v-model="leftBool"> left drawer </UDrawer>
  </div>
</template>
