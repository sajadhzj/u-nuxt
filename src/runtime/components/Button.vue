<script lang="ts" setup>
import { tv } from "tailwind-variants";
import type { colorType, sizeType } from "../types/props";

interface buttonPropInterface {
  color?: colorType;
  size?: sizeType;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  rounded?: boolean;
  outline?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  label?: string;
  icon?: string;
  iconColor?: string;
  iconPos?: "right" | "left";
}

const props: any = withDefaults(defineProps<buttonPropInterface>(), {
  color: "primary",
  size: "md",
  type: "button",
  disabled: false,
  raised: false,
  rounded: false,
  outline: false,
  loading: false,
  ariaLabel: "",
  label: "",
  icon: "",
  iconPos: "right",
  iconColor: "text-white",
});
const button = tv({
  base: "u-button px-3 py-1.5 rounded-lg shadow-md cursor-pointer text-white h-max disabled:opacity-40 disabled:cursor-not-allowed font-medium flex gap-1 items-center",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
    },
    color: {
      primary:
        "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 hover:disabled:bg-primary-600",
      secondary:
        "bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800 hover:disabled:bg-secondary-600 text-black",
      danger:
        "bg-red-600 hover:bg-red-700 active:bg-red-800 hover:disabled:bg-red-600",
      warning:
        "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 hover:disabled:bg-yellow-600",
      info: "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 hover:disabled:bg-sky-600",
      success:
        "bg-green-600 hover:bg-green-700 active:bg-green-800 hover:disabled:bg-green-600",
    },
    iconPos: {
      right: "",
      left: "flex-row-reverse",
    },
    rounded: {
      true: "rounded-full",
    },
    outline: {
      true: "shadow-none bg-transparent border text-black",
    },
  },
  compoundVariants: [
    {
      outline: true,
      color: "primary",
      class: "border-primary-500 hover:bg-primary-100",
    },
    {
      outline: true,
      color: "secondary",
      class: "border-secondary-500 hover:bg-secondary-100",
    },
    {
      outline: true,
      color: "danger",
      class: "border-red-500 hover:bg-red-100",
    },
    {
      outline: true,
      color: "warning",
      class: "border-yellow-500 hover:bg-yellow-100",
    },
    {
      outline: true,
      color: "info",
      class: "border-sky-500 hover:bg-sky-100",
    },
    {
      outline: true,
      color: "success",
      class: "border-green-500 hover:bg-green-100",
    },
  ],
});
</script>

<template>
  <button
    :type="props.type"
    :class="[
      button({
        color: props.color,
        size: props.size,
        rounded: props.rounded,
        outline: props.outline,
        iconPos: props.iconPos,
      }),
    ]"
    :disabled="props.disabled || props.loading"
    :aria-label="props.ariaLabel"
  >
    {{ props.label }}
    <ULoading
      v-if="props.loading"
      :size="props.size"
      :color="props.outline ? props.color : 'white'"
    />

    <UIcon
      v-if="props.icon && !props.loading"
      :name="props.icon"
      :size="15"
      :class="props.iconColor"
    />
  </button>
</template>
