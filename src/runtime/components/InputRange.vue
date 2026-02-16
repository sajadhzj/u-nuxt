<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 100],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);
const from = ref(Math.min(props.modelValue[0] ?? props.min, props.max));
const to = ref(Math.max(props.modelValue[1] ?? props.max, props.min));
const leftHandle = ref(null);
const rightHandle = ref(null);
const range = computed(() => props.max - props.min || 1);
const fromPercent = computed(
  () => ((from.value - props.min) / range.value) * 100,
);
const toPercent = computed(() => ((to.value - props.min) / range.value) * 100);

watch(
  () => props.modelValue,
  (nv) => {
    if (!Array.isArray(nv)) return;
    const [a, b] = nv;
    if (a !== undefined) from.value = clamp(a);
    if (b !== undefined) to.value = clamp(b);
  },
  { deep: true },
);

watch([from, to], () => {
  if (from.value > to.value) {
    const tmp = from.value;
    from.value = to.value;
    to.value = tmp;
  }
  emit("update:modelValue", [from.value, to.value]);
});

function clamp(v) {
  return Math.min(props.max, Math.max(props.min, roundToStep(v)));
}

function roundToStep(v) {
  const steps = Math.round((v - props.min) / props.step);
  return props.min + steps * props.step;
}

let dragging = null; // 'left' | 'right' | null

function getPercentFromEvent(e) {
  const track = (leftHandle.value || rightHandle.value)?.parentElement;
  const rect = track.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let pct = ((clientX - rect.left) / rect.width) * 100;
  pct = Math.min(100, Math.max(0, pct));
  return pct;
}

function percentToValue(pct) {
  return clamp(props.min + (pct / 100) * range.value);
}

function startDrag(which, e) {
  dragging = which;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag, { passive: false });
  window.addEventListener("touchend", stopDrag);
  onDrag(e);
}

function onDrag(e) {
  if (!dragging) return;
  if (e.cancelable) e.preventDefault();
  const pct = getPercentFromEvent(e);
  const val = percentToValue(pct);
  if (dragging === "left") {
    // don't cross over right handle
    from.value = Math.min(val, to.value);
  } else if (dragging === "right") {
    to.value = Math.max(val, from.value);
  }
}

function stopDrag() {
  dragging = null;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
}

function stepValue(which, dir) {
  if (which === "left") {
    from.value = clamp(from.value + dir * props.step);
    if (from.value > to.value) from.value = to.value;
  } else {
    to.value = clamp(to.value + dir * props.step);
    if (to.value < from.value) to.value = from.value;
  }
}

onBeforeUnmount(() => {
  stopDrag();
});

onMounted(() => {
  if (Array.isArray(props.modelValue)) {
    const [a, b] = props.modelValue;
    if (a !== undefined) from.value = clamp(a);
    if (b !== undefined) to.value = clamp(b);
  }
});
</script>

<template>
  <div class="w-full max-w-xl mx-auto p-4">
    <div class="relative h-12">
      <div
        class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-2 bg-primary-200 rounded-full"
      ></div>

      <div
        class="absolute top-1/2 transform -translate-y-1/2 h-2 bg-primary-500 rounded-full"
        :style="{ left: fromPercent + '%', right: 100 - toPercent + '%' }"
      ></div>

      <button
        ref="leftHandle"
        class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 w-6 h-6 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
        :style="{ left: fromPercent + '%' }"
        @mousedown.prevent="startDrag('left', $event)"
        @touchstart.prevent="startDrag('left', $event)"
        @keydown.left.prevent="stepValue('left', -1)"
        @keydown.right.prevent="stepValue('left', 1)"
        @keydown.up.prevent="stepValue('left', 1)"
        @keydown.down.prevent="stepValue('left', -1)"
        :aria-valuemin="min"
        :aria-valuemax="to"
        :aria-valuenow="from"
        role="slider"
        tabindex="0"
      ></button>

      <button
        ref="rightHandle"
        class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 w-6 h-6 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
        :style="{ left: toPercent + '%' }"
        @mousedown.prevent="startDrag('right', $event)"
        @touchstart.prevent="startDrag('right', $event)"
        @keydown.left.prevent="stepValue('right', -1)"
        @keydown.right.prevent="stepValue('right', 1)"
        @keydown.up.prevent="stepValue('right', 1)"
        @keydown.down.prevent="stepValue('right', -1)"
        :aria-valuemin="from"
        :aria-valuemax="max"
        :aria-valuenow="to"
        role="slider"
        tabindex="0"
      ></button>
    </div>
  </div>
</template>

<style scoped>
button[role="slider"] {
  touch-action: none;
}
</style>
