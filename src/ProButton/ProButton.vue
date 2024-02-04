<template>
  <component
      :is="componentTag"
      :type="nativeType"
      v-bind="$attrs"
      :disabled="disabled || loading || $attrs.disabled"
      :class="btnClass"
      :to="tag === 'router-link' && href"
      :href="tag === 'a' && href"
  >
    <slot name="iconLeft" />
    <span>
      <slot />
    </span>
    <slot name="iconRight" />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({
  name: 'PRButton',
  inheritAttrs: false,
})

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: [String, Object],
    default: '',
  },

  // modificators
  // добавляет индикатор загрузки
  loading: {
    type: Boolean,
    default: false,
  },
  // делает кнопку с обводкой
  outlined: {
    type: Boolean,
    default: false,
  },
  // делает кнопку с круглой
  round: {
    type: Boolean,
    default: true,
  },
  // делает кнопку на всю ширину
  expanded: {
    type: Boolean,
    default: false,
  },
  // optional - type button
  nativeType: {
    type: String,
    default: 'button',
    validator: (value: string) => {
      return ['button', 'submit', 'reset'].includes(value)
    },
  },
  // optional - tag button
  tag: {
    type: String,
    default: 'button',
    validator: (value: string) => {
      return ['a', 'button', 'router-link'].includes(
          value
      )
    },
  },
  href: {
    type: String,
    default: '',
  },
})

const attrs = useAttrs()

const linked = computed(() => {
  return ['a', 'router-link'].includes(props.tag)
})

const componentTag = computed(() => {
  if (
      attrs.disabled !== undefined &&
      attrs.disabled !== false
  ) {
    return 'button'
  }

  return props.tag
})

const btnClass = computed(() => {
  return [
    'pr-btn',
    props.className,
    {
      'pr-btn--loading': props.loading,
      'pr-btn--outline': props.outlined,
      'pr-btn--round': props.round,
      'pr-btn--block': props.expanded,
      'pr-btn--link': linked.value,
    },
  ]
})
</script>


<style scoped>
.pr-btn {
  background-color: var(--pro-primary);
}
</style>
