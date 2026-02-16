<script lang="ts" setup>
import { ref, watch } from "#imports";
import type { sizeType } from "../types/props";

interface iconPropInterface {
  name: string;
  size?: number | sizeType;
  strokeWidth?: number;
}

const props: iconPropInterface = withDefaults(
  defineProps<iconPropInterface>(),
  {
    size: 20,
    color: "#000",
    strokeWidth: 1,
  },
);
const icon = ref("");
const computeSize = (size: number | string): number => {
  let result: number = 0;

  switch (size) {
    case "sm":
      result = 16;
      break;
    case "md":
      result = 20;
      break;
    case "lg":
      result = 24;
      break;
    default:
      result = <number>size;
      break;
  }

  return result;
};
const computeProps = (icon: any) => {
  const size = computeSize(<number>props.size);
  const strokeWidth = props.strokeWidth;
  return icon
    .replace(
      /<svg([^>]*)>/,
      `<svg class="u-icon-${props.name} fill-current stroke-current"$1>`,
    )
    .replace(/(?<!stroke-)width="(\d+)"/g, `width="${size}"`)
    .replace(/height="(\d+)"/g, `height="${size}"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
};

const getIcon = async () => {
  try {
    const iconsImport = import.meta.glob("assets/icons/**/**.svg", {
      query: "?raw",
      eager: false,
    });

    let rawIcon = "";
    if (typeof iconsImport[`/assets/icons/${props.name}.svg`] !== "undefined") {
      const icon: any = await iconsImport[`/assets/icons/${props.name}.svg`]();
      rawIcon = icon.default;
    } else {
      const staticAssets = import.meta.glob("../assets/icons/**/**.svg", {
        query: "?raw",
        eager: false,
      });
      const icon: any =
        await staticAssets[`../assets/icons/${props.name}.svg`]();
      rawIcon = icon.default;
    }
    icon.value = computeProps(rawIcon);
  } catch (e) {
    console.error(
      `glorious error -> Icon '${props.name}' doesn't exist in 'assets/icons'`,
    );
  }
};

await getIcon();

watch(
  () => props,
  () => getIcon(),
  {
    deep: true,
  },
);
</script>

<template>
  <ClientOnly>
    <div class="w-max h-max u-icon" v-html="icon" />
  </ClientOnly>
</template>
