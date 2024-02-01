<script setup lang="ts">
import { PRButton } from "prosklad-component-lib"

const onClick = () => {
  console.log("clicked")
}
</script>

<template>
  <PRButton text="Click me!" @click="onClick" />
  <PRButton :text="12" />
</template>

<style scoped>

</style>
