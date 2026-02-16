<script lang="ts" setup>
const items = [
  {
    text: "one",
    value: 1,
  },
  {
    text: "two",
    value: 2,
  },
];
</script>

<template>
  <div class="p-4">
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">color :</h3>
      <USwitch />
    </section>
  </div>
</template>
