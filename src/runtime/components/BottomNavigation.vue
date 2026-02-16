<script lang="ts" setup>
import { useRoute } from "#app";
import { tv } from "tailwind-variants";

interface itemsInterface {
  text?: string;
  icon: string;
  to: string;
  isActive?: boolean;
  hasChip?: boolean;
  chipText?: string;
}

interface propsInterface {
  items: Array<itemsInterface>;
}

const route = useRoute();
const props = defineProps<propsInterface>();
const itemClicked = (item: itemsInterface) => {
  props.items.map((mapItem) => {
    mapItem.isActive = false;
  });
  item.isActive = true;
};
const isActive = (item: itemsInterface) => {
  return route.path.includes(item.to);
};
const styles = tv({
  slots: {
    base: "fixed bottom-0 right-0 bg-white w-full flex justify-around",
    links: "basis-1/3 flex flex-col items-center gap-1 py-2 text-center",
    chip: "bg-red-500 w-4 h-4 text-xs rounded-full absolute -top-1 -right-1 text-white",
    text: "",
  },
  variants: {
    isActive: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      isActive: true,
      class: {
        links: "text-primary-500",
        text: "text-md font-bold text-primary-500",
      },
    },
    {
      isActive: false,
      class: {
        links: "text-black",
        text: "text-sm  font-light",
      },
    },
  ],
});

const { base, links, chip, text } = styles();
</script>

<template>
  <div :class="base()">
    <NuxtLink
      v-for="(item, index) in props.items"
      :key="index"
      :to="item.to"
      :class="[links({ isActive: isActive(item) || item.isActive })]"
      @click="itemClicked(item)"
    >
      <div class="relative">
        <UIcon :name="item.icon" class="w-6 h-6" />
        <div v-if="item.hasChip" :class="chip()">
          {{ item.chipText ?? "" }}
        </div>
      </div>
      <span :class="text()">
        {{ item.text }}
      </span>
    </NuxtLink>
  </div>
</template>
