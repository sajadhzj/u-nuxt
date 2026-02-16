<script lang="ts" setup>
import { tv } from "tailwind-variants";
import type { sizeType, colorType } from "../types/props";

interface propsInterface {
  title?: string;
  okBtn?: string;
  okBtnLoading?: boolean;
  closeBtn?: string;
  colorBtn?: colorType;
  size?: sizeType;
}

const props = withDefaults(defineProps<propsInterface>(), {
  title: "",
  size: "md",
  isFullScreen: false,
  closeBtn: "بستن",
});
const emits = defineEmits(["ok", "close"]);
const modelValue = defineModel<boolean>();
const styles = tv({
  slots: {
    backdrop:
      "bg-gray-500 fixed top-0 min-h-screen w-full backdrop-blur-sm transition-opacity duration-300 z-50",
    base: "fixed bg-white lg:rounded-b-xl rounded-t-xl bottom-0 lg:top-0 lg:right-0 lg:left-0 lg:mx-auto lg:my-auto h-max z-50 w-full transition-all duration-300 ease-in-out translate-y-full",
    content: "u-scaffold-modal-content overflow-y-auto max-h-[80vh] px-3",
    header: "py-4 px-3 text-xl border-gray-500",
  },
  variants: {
    isOpen: {
      true: {
        backdrop: "opacity-70",
        base: "translate-y-0 opacity-100",
      },
      false: {
        backdrop: "opacity-0 pointer-events-none",
        base: "opacity-0 pointer-events-none",
      },
    },
    size: {
      sm: {
        base: "lg:w-1/4",
      },
      md: {
        base: "lg:w-1/3",
      },
      lg: {
        base: "lg:w-2/3",
      },
    },
  },
});
const { backdrop, base, content, header } = styles();
</script>

<template>
  <Teleport to="#teleports">
    <div
      :class="[backdrop({ isOpen: modelValue })]"
      @click="modelValue = false"
    ></div>
    <div :class="[base({ isOpen: modelValue, size: props.size })]">
      <!-- header -->
      <div v-show="props?.title !== ''" :class="[header()]">
        <h3 class="font-medium">{{ props.title }}</h3>
      </div>

      <!-- end header -->

      <div :class="[content()]">
        <slot />
      </div>

      <slot name="footer"></slot>
      <!-- start footer -->
      <div v-show="props.okBtn" class="u-scaffold-modal-footer">
        <UButton
          :color="props.colorBtn"
          :loading="props.okBtnLoading"
          :label="props.okBtn"
          @click="emits('ok')"
        />

        <UButton
          :color="props.colorBtn"
          v-show="props.closeBtn !== ''"
          outline
          :label="props.closeBtn"
          @click="modelValue = false"
        />
      </div>
      <!-- end footer -->
    </div>
  </Teleport>
</template>
