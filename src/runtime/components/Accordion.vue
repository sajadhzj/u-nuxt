<script setup>
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    base: `u-accordion rounded-lg overflow-hidden bg-white shadow transition-[box-shadow] duration-500 will-change-['box-shadow']`,
    header: `cursor-pointer px-4 py-5 bg-primary-50 font-semibold flex items-center justify-between transition-[background-color] duration-300`,
    bodyWrapper2: `overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]`,
    body2: `px-4 py-5 bg-white text-black`,
    baseArrowRotate: "transition-rotate duration-300 ease-in-out",
  },
  variants: {
    arrowRotate: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      arrowRotate: true,
      class: {
        baseArrowRotate: "-rotate-90",
      },
    },
    {
      arrowRotate: false,
      class: {
        baseArrowRotate: "rotate-90",
      },
    },
  ],
});
const { base, header, bodyWrapper2, body2, baseArrowRotate } = styles();
const isOpen = ref(false);
const body = ref(null);
const bodyWrapper = ref(null);
const maxHeight = ref(0);
const toggle = () => {
  isOpen.value = !isOpen.value;
  maxHeight.value = body.value ? body.value.scrollHeight : 0;
};
</script>

<template>
  <div :class="[base()]">
    <div :class="[header()]" @click="toggle">
      <slot name="header" @click="pre" />

      <UIcon
        name="u-arrow"
        :size="15"
        :class="[baseArrowRotate({ arrowRotate: isOpen })]"
      />
    </div>

    <div
      :class="[bodyWrapper2()]"
      :style="{ maxHeight: isOpen ? maxHeight + 'px' : '0' }"
      ref="bodyWrapper"
    >
      <div :class="[body2()]" ref="body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>
