<script lang="ts" setup>
const navigationItem = [
  {
    text: "button",
    icon: "u-arrow",
    to: "/components/button",
    hasChip: true,
    chipText: "1",
  },
  {
    text: "icon",
    icon: "u-arrow",
    to: "/components/icon",
    isActive: true,
  },
  {
    text: "loading",
    icon: "u-arrow",
    to: "/components/loading",
    hasChip: true,
  },
];
</script>
<template>
  <div class="p-4">
    <UBottomNavigation :items="navigationItem" />
  </div>
</template>
