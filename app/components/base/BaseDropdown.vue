<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  modelValue: string;
  options: DropdownOption[];
  placeholder?: string;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  placeholder: 'Select option',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (value: string) => {
  emit('update:modelValue', value);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === props.modelValue);
  return found ? found.label : props.placeholder;
});
</script>

<template>
  <div
    ref="dropdownRef"
    class="base-dropdown"
    :class="{ 'base-dropdown--open': isOpen }">
    <button
      type="button"
      class="base-dropdown__trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggleDropdown">
      <span class="base-dropdown__value">{{ selectedLabel }}</span>
      <span class="base-dropdown__arrow" aria-hidden="true">▾</span>
    </button>

    <Transition name="fade">
      <ul v-if="isOpen" class="base-dropdown__dropdown" role="listbox">
        <li
          v-for="option in options"
          :key="option.value"
          class="base-dropdown__option"
          :class="{
            'base-dropdown__option--selected': option.value === modelValue,
          }"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option.value)">
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.base-dropdown {
  position: relative;
  display: inline-block;
  min-width: 150px;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-4);
    background: var(--color-surface-subtle);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: var(--font-sm);
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 140ms ease,
      border-color 140ms ease;

    &:hover {
      background: var(--color-surface);
      border-color: var(--color-border);
    }
  }

  &__value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__arrow {
    font-size: 10px;
    color: var(--color-text-muted);
    transition: transform 140ms ease;
  }

  &--open &__arrow {
    transform: rotate(180deg);
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + var(--space-1));
    right: 0;
    z-index: 20;
    display: grid;
    gap: var(--space-1);
    min-width: 100%;
    margin: 0;
    padding: var(--space-1);
    list-style: none;
    background: var(--color-surface);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &__option {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    border-radius: var(--radius-md);
    cursor: pointer;
    white-space: nowrap;
    transition:
      background-color 120ms ease,
      color 120ms ease;

    &:hover {
      background: var(--color-surface-subtle);
      color: var(--color-text);
    }

    &--selected {
      background: var(--color-primary-soft);
      color: var(--color-primary);
      font-weight: 500;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
