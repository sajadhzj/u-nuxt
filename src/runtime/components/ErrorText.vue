<script lang="ts" setup>
import { tv } from "tailwind-variants";
import { useFetchStore } from "../stores/useFetchStore";

interface errorTextPropInterface {
  error?: string;
}

const props: any = withDefaults(defineProps<errorTextPropInterface>(), {});
const uFetchStore = useFetchStore();
const [id, key] = props.error.split("|");
const styles = tv({
  base: "text-red-500 text-xs font-semibold inline-block animate-[var(--animate-vibrate-error)]",
});
</script>
<template>
  <div>
    <span v-if="uFetchStore.errors[id]?.[key]" :class="styles()">
      {{ uFetchStore.errors[id]?.[key][0] }}
    </span>
  </div>
</template>
