<script setup lang="ts">
import { tv } from "tailwind-variants";
import { computed, ref, watch } from "vue";

const model = defineModel<boolean>();
const props = defineProps<{
  side?: "left" | "right";
}>();
const withAnim = ref(true);
const side = computed(() => props.side ?? "right");
const drawerContentElement = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const closeDrawer = () => {
  const drawer = drawerContentElement.value;
  if (!drawer) return;
  drawer.style.removeProperty("transform");
  model.value = false;
};
const onDragStart = (e: MouseEvent | TouchEvent) => {
  const drawer = drawerContentElement.value;
  if (!drawer) return;

  isDragging.value = true;

  let clientX: number;

  if (e instanceof TouchEvent) {
    const touch = e.touches[0] ?? e.changedTouches[0];
    if (!touch) return;
    clientX = touch.clientX;
  } else {
    clientX = e.clientX;
  }

  startX.value = clientX;

  withAnim.value = false;
  document.body.classList.add("no-select");
};
const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  const drawer = drawerContentElement.value;
  if (!drawer) return;

  let clientX: number;

  if (e instanceof TouchEvent) {
    const touch = e.touches[0] ?? e.changedTouches[0];
    if (!touch) return;
    clientX = touch.clientX;
  } else {
    clientX = e.clientX;
  }

  currentX.value = clientX;
  const delta = currentX.value - startX.value;

  if (side.value === "right" && delta > 0) {
    drawer.style.transform = `translateX(${delta}px)`;
  }

  if (side.value === "left" && delta < 0) {
    drawer.style.transform = `translateX(${delta}px)`;
  }
};
const onDragEnd = () => {
  const drawer = drawerContentElement.value;
  if (!drawer) return;

  isDragging.value = false;
  document.body.classList.remove("no-select");

  withAnim.value = true;

  const delta = currentX.value - startX.value;
  const threshold = 60;

  if (side.value === "right") {
    if (delta > threshold) {
      drawer.style.removeProperty("transform");
      model.value = false;
      return;
    }
  } else {
    if (delta < -threshold) {
      drawer.style.removeProperty("transform");
      model.value = false;
      return;
    }
  }

  drawer.style.transform = "translateX(0)";
};

watch(isDragging, (active) => {
  if (active) {
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);

    document.addEventListener("touchmove", onDragMove, { passive: false });
    document.addEventListener("touchend", onDragEnd);
  } else {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);

    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  }
});

const styles = tv({
  slots: {
    base: "u-drawer",
    backdrop:
      "fixed bg-gray-500 z-30 inset-[0] opacity-0 transition-[opacity] duration-300 ease-in pointer-events-none",
    content: "fixed top-0 min-h-screen bg-white w-2xs z-40 shadow-lg",
    swiper: "rounded-full h-10 w-1 bg-gray-300 top-1/2 absolute cursor-grab",
    anim: "",
  },
  variants: {
    openBackdrop: {
      true: "",
      false: "",
    },
    right: {
      true: "",
    },
    left: {
      true: "",
    },
    open: {
      true: "",
    },
    swiper: {
      right: "",
      left: "",
    },
    anim: {
      true: "",
    },
  },
  compoundVariants: [
    {
      anim: true,
      class: {
        anim: "transition-all duration-300 ease-in-out",
      },
    },
    {
      swiper: "right",
      class: {
        swiper: "left-1",
      },
    },
    {
      swiper: "left",
      class: {
        swiper: "right-1",
      },
    },
    {
      openBackdrop: true,
      class: {
        backdrop: "pointer-events-auto opacity-50",
      },
    },
    {
      openBackdrop: false,
      class: "",
    },
    {
      right: true,
      class: {
        content: "right-0 translate-x-full",
      },
    },
    {
      left: true,
      class: {
        content: "left-0 -translate-x-full",
      },
    },
    {
      open: true,
      class: {
        content: "translate-x-0",
      },
    },
  ],
});
const { base, backdrop, content, swiper, anim } = styles();
</script>

<template>
  <Teleport to="#teleports">
    <div :class="base()">
      <div
        :class="[backdrop({ openBackdrop: model })]"
        @click="closeDrawer"
      ></div>
      <div
        :class="[
          content({
            right: props.side === 'right',
            left: props.side === 'left',
            open: model,
          }),
          anim({ anim: withAnim }),
        ]"
        ref="drawerContentElement"
      >
        <div
          :class="swiper({ swiper: props.side })"
          @mousedown="onDragStart"
          @touchstart.prevent="onDragStart"
        ></div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
