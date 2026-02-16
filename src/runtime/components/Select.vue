<script lang="ts" setup>
import { computed, ref } from "vue";
import type { colorType, sizeType } from "../types/props";
import { tv } from "tailwind-variants";

interface propInterface {
  options: Array<Record<string, any>>;
  placeholder?: string;
  searchable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  size?: sizeType;
  color?: colorType;
  optionLabel?: string;
  optionValue?: string;
}

const props = withDefaults(defineProps<propInterface>(), {
  searchable: false,
  loading: false,
  disabled: false,
  color: "primary",
  size: "md",
  error: "|",
  optionLabel: "text",
  optionValue: "value",
});
const model = defineModel();
const isOpen = ref(false);
const searchTerm = ref("");
const emits = defineEmits(["change"]);
const selectContainer = ref<HTMLElement>();
const isOptionSelected = (option: Record<string, any>) =>
  option[props.optionValue] === model.value;
const selectedOption = computed(() => {
  if (!model.value) return null;

  return props.options.find(
    (option) => option[props.optionValue] === model.value,
  );
});
const filteredOptions = computed(() => {
  if (!props.searchable || !searchTerm.value) return props.options;

  const term = searchTerm.value.toLowerCase();
  return props.options.filter(
    (option) =>
      option.text.toLowerCase().includes(term) ||
      (option[props.optionValue] &&
        option[props.optionValue].toString().toLowerCase().includes(term)),
  );
});
const toggleDropdown = async () => {
  if (props.disabled || props.loading) return;
  isOpen.value = !isOpen.value;
  searchTerm.value = "";
  document.addEventListener("click", handleClickOutside);
};
const selectOption = (option: Record<string, any>) => {
  model.value = option[props.optionValue];
  isOpen.value = false;
  emits("change", model.value);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target;
  if (
    target instanceof Node &&
    selectContainer.value &&
    !selectContainer.value.contains(target)
  ) {
    isOpen.value = false;
    document.removeEventListener("click", handleClickOutside);
  }
};
const styles = tv({
  slots: {
    base: "u-select relative",
    arrowIcon: "transition-[rotate] duration-300 ease-in-out mr-1",
    selectView:
      "flex items-center justify-between w-full px-3 rounded-md cursor-pointer transition-all duration-300 bg-white border-1",
    selectBox:
      "absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-x-hidden origin-top",
    selectList:
      "px-3 py-2 m-1 rounded-lg text-sm cursor-pointer flex items-center transition-all duration-300",
  },
  variants: {
    selected: {
      true: "",
    },
    size: {
      sm: {
        selectView: "py-0.75",
      },
      md: {
        selectView: "py-1.25",
      },
      lg: {
        selectView: "py-1.75",
      },
    },
    isOpen: {
      true: {
        arrowIcon: "rotate-90",
      },
      false: {
        arrowIcon: "-rotate-90",
      },
    },
    color: {
      primary: {
        selectView: "border-primary-600",
        selectList: "hover:bg-primary-100",
      },
      secondary: {
        selectView: "border-secondary-600",
        selectList: "hover:bg-secondary-100",
      },
      danger: {
        selectView: "border-red-600",
        selectList: "hover:bg-red-100",
      },
      info: {
        selectView: "border-sky-600",
        selectList: "hover:bg-sky-100",
      },
      success: {
        selectView: "border-green-600",
        selectList: "hover:bg-green-100",
      },
      warning: {
        selectView: "border-yellow-600",
        selectList: "hover:bg-yellow-100",
      },
    },
  },
  compoundVariants: [
    {
      selected: true,
      color: "primary",
      class: {
        selectList: "bg-primary-200",
      },
    },
    {
      selected: true,
      color: "secondary",
      class: {
        selectList: "bg-secondary-200",
      },
    },
    {
      selected: true,
      color: "danger",
      class: {
        selectList: "bg-red-200",
      },
    },
    {
      selected: true,
      color: "warning",
      class: {
        selectList: "bg-yellow-200",
      },
    },
    {
      selected: true,
      color: "success",
      class: {
        selectList: "bg-green-200",
      },
    },
    {
      selected: true,
      color: "info",
      class: {
        selectList: "bg-sky-200",
      },
    },
  ],
});

const { base, arrowIcon, selectView, selectBox, selectList } = styles();
</script>

<template>
  <div :class="[base(), `color-${props.color}`]" ref="selectContainer">
    <div
      :class="[
        selectView({ isOpen, color: props.color, size: props.size }),
        { disabled: props.disabled },
      ]"
      @click="toggleDropdown"
    >
      <div class="flex items-center truncate">
        <div v-if="loading" class="flex items-center mr-2">
          <ULoading size="sm" />
        </div>
        <div v-else :class="[arrowIcon({ isOpen })]">
          <ClientOnly>
            <UIcon name="u-arrow" size="sm" />
          </ClientOnly>
        </div>
        <span
          class="truncate transition-colors duration-300"
          :class="{ 'text-gray-500': !selectedOption }"
        >
          {{ selectedOption?.text || placeholder }}
        </span>
      </div>
    </div>
    <UErrorText v-if="props.error !== '|'" :error="props.error" />

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" :class="selectBox()">
        <div v-if="searchable" class="px-2 py-1 sticky top-0 bg-white z-10">
          <UInput
            type="text"
            v-model="searchTerm"
            placeholder="جستجو..."
            size="sm"
          />
        </div>

        <ul>
          <li
            v-if="filteredOptions.length === 0"
            class="px-3 py-2 text-sm text-gray-500"
          >
            موردی یافت نشد
          </li>

          <transition-group name="fade-list" tag="ul">
            <li
              v-for="(option, index) in filteredOptions"
              :key="index"
              :class="[
                selectList({
                  color: props.color,
                  selected: isOptionSelected(option),
                }),
              ]"
              @click.stop="selectOption(option)"
            >
              <span class="truncate">{{ option[props.optionLabel] }}</span>
            </li>
          </transition-group>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-list-move,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
