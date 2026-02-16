<script lang="ts" setup>
import type { colorType, sizeType } from "../types/props";
import { useFetchStore } from "../stores/useFetchStore";
import { tv } from "tailwind-variants";

interface inputPropInterface {
  color?: colorType;
  size?: sizeType;
  disabled?: boolean;
  title?: string;
  placeholder?: string;
  error?: string;
  type?: string;
  icon?: string;
  iconPos?: "right" | "left";
}
const props: any = withDefaults(defineProps<inputPropInterface>(), {
  color: "primary",
  size: "md",
  disabled: false,
  title: "",
  placeholder: "",
  error: "|",
  type: "text",
  icon: "",
  iconPos: "right",
});
const emits = defineEmits(["iconClicked"]);
const iconClicked = () => emits("iconClicked");
const model = defineModel();

const _useFetchStore = useFetchStore();

const styles = tv({
  base: "u-input flex flex-col gap-0.5 relative w-full",
  slots: {
    title: "text-base",
    inputContent: "relative",
    input: "bg-white rounded-lg px-3 w-full hover:shadow",
    icon: "absolute top-0 bottom-0 my-auto h-max px-3 cursor-pointer",
  },
  variants: {
    iconPos: {
      right: {
        icon: "-right-1",
      },
      left: {
        icon: "-left-1",
      },
    },
    color: {
      primary: {
        input:
          "border border-primary-600 hover:border-primary-700 focus:outline-primary-600",
      },
      secondary: {
        input:
          "border border-secondary-600 hover:border-secondary-700 focus:outline-secondary-600",
      },
      danger: {
        input:
          "border border-red-600 hover:border-red-700 focus:outline-red-600",
      },
      info: {
        input:
          "border border-sky-600 hover:border-sky-700 focus:outline-sky-600",
      },
      warning: {
        input:
          "border border-yellow-600 hover:border-yellow-700 focus:outline-yellow-600",
      },
      success: {
        input:
          "border border-green-600 hover:border-green-700 focus:outline-green-600",
      },
    },
    size: {
      sm: {
        input: "text-sm py-1.25",
      },
      md: {
        input: "text-base py-1.25",
      },
      lg: {
        input: "text-xl py-1.25",
      },
    },
    disabled: {
      true: {
        input: "cursor-not-allowed bg-gray-200 hover:shadow-none ",
      },
    },
  },
  compoundVariants: [
    {
      iconPos: "right",
      size: "sm",
      class: {
        input: "pl-7.5",
      },
    },
    {
      iconPos: "right",
      size: "md",
      class: {
        input: "pl-9.25",
      },
    },
    {
      iconPos: "right",
      size: "lg",
      class: {
        input: "pl-8.5",
      },
    },
    {
      iconPos: "left",
      size: "sm",
      class: {
        input: "pl-7.5",
      },
    },
    {
      iconPos: "left",
      size: "md",
      class: {
        input: "pl-9.25",
      },
    },
    {
      iconPos: "left",
      size: "lg",
      class: {
        input: "pl-8.5",
      },
    },
  ],
});
const { title, inputContent, input, icon } = styles();
</script>

<template>
  <div :class="styles()">
    <span v-if="props.title" :class="title()">
      {{ props.title }}
    </span>
    <div :class="inputContent()">
      <UIcon
        v-if="props.icon"
        :class="[icon({ iconPos: props.iconPos })]"
        :size="props.size"
        :name="props.icon"
        @click="iconClicked()"
      />
      <input
        v-model="model"
        :class="[
          input({
            color: _useFetchStore.hasError(props.error)
              ? 'danger'
              : props.color,
            size: props.size,
            disabled: props.disabled,
            iconPos: props.iconPos,
          }),
        ]"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :type="props.type"
      />
    </div>

    <UErrorText v-if="props.error !== '|'" :error="props.error" />
  </div>
</template>
