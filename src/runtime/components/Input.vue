<script lang="ts" setup>
import type { colorType, sizeType } from "~/src/types/props";

interface inputPropInterface {
  color?: colorType;
  size?: sizeType;
  disabled?: boolean;
  title?: string;
  placeholder?: string;
  error?: string;
  type?: string;
  icon?: string;
  iconColor?: string;
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
  iconColor: "#000",
});

const emits = defineEmits(["iconClicked"]);
const iconClicked = () => emits("iconClicked");
const model = defineModel();
</script>

<template>
  <div class="u-input">
    <span v-if="props.title" class="title">
      {{ props.title }}
    </span>
    <div class="input-content">
      <UIcon
        v-if="props.icon"
        class="icon"
        :class="[`icon-${props.iconPos}`]"
        :size="props.size"
        :color="props.iconColor"
        :name="props.icon"
        @click="iconClicked()"
      />
      <input
        v-model="model"
        :class="[
          `color-${props.color}`,
          `size-${props.size}`,
          props.error !== '|' ? 'error' : '',
        ]"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :type="props.type"
      />
    </div>
    <!-- <GErrorText
      v-if="props.error !== '|'"
      :error="props.error"
    /> -->
  </div>
</template>
