<script lang="ts" setup>
import { tv } from "tailwind-variants";
import type { colorType } from "../types/props";

interface propsInterface {
  color: colorType;
  checked: boolean;
}
const modelValue = defineModel();
const props = withDefaults(defineProps<propsInterface>(), {
  color: "primary",
  checked: false,
});
const input = (e: Event) => {
  const target = e.target as HTMLInputElement;
  modelValue.value = target.checked;
};

const styles = tv({
  slots: {
    label: "switch",
    _input: "peer hidden",
    span: `
    switch-slider
    bg-gray-300
    inline-block
    w-12
    h-6
    rounded-xl
    relative
    transition-all
    duration-300
    ease-in-out

    after:content-[]
    after:inline-block
    after:bg-white
    after:w-4
    after:h-4
    after:rounded-full
    after:absolute
    after:top-0
    after:bottom-0
    after:my-auto
    after:shadow
    after:translate-x-1
    after:transition-all
    after:duration-300
    after:ease-in-out

    peer-checked:after:translate-x-6.75
    peer-checked:bg-primary-600
    `,
  },
});

const { span, label, _input } = styles();
</script>

<template>
  <div>
    <label :class="[label()]">
      <input
        :class="[_input()]"
        type="checkbox"
        @input="input"
        :checked="props.checked"
      />
      <span :class="[span()]"></span>
    </label>
  </div>
</template>
