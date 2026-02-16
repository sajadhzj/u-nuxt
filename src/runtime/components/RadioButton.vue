<script setup lang="ts">
import { tv } from "tailwind-variants";
import type { colorType, sizeType } from "../types/props";

interface propsInterface {
  name?: string;
  value?: string | number;
  size?: sizeType;
  color?: colorType;
  disable?: boolean;
}

const props = withDefaults(defineProps<propsInterface>(), {
  name: "u-radio",
  value: "",
  size: "md",
  color: "primary",
});

const modelValue = defineModel();

const styles = tv({
  slots: {
    input: "peer hidden",
    label: "u-radio-button flex items-center cursor-pointer relative gap-2",
    span: `
      border-2 border-primary-600
      relative rounded-full w-4 h-4
      flex items-center justify-center

      after:content-['']
      after:absolute
      after:top-1/2
      after:left-1/2
      after:w-[60%]
      after:h-[60%]
      after:rounded-full
      after:bg-primary-600
      after:-translate-x-1/2
      after:-translate-y-1/2
      after:opacity-0
      after:scale-0
      after:transition-all
      after:duration-200

      peer-checked:after:opacity-100
      peer-checked:after:scale-100
    `,
  },
});

const { label, input, span } = styles();
</script>

<template>
  <label :class="[label(), `size-${props.size}`]">
    <input
      type="radio"
      :name="props.name"
      :value="props.value"
      v-model="modelValue"
      :disabled="props.disable"
      :class="[input()]"
    />

    <span class="radio-select" :class="[span(), `color-${props.color}`]"></span>
  </label>
</template>
