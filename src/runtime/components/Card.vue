<script lang="ts" setup>
import { tv } from "tailwind-variants";

const styles = tv({
  base: " bg-white p-3 shadow-lg rounded-xl",
});
</script>
<template>
  <div :class="styles()">
    <slot name="content" />
  </div>
</template>
