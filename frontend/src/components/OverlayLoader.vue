<template>
  <v-dialog
    content-class="overlay-content"
    class="d-flex align-center justify-center"
    scroll-strategy="block"
    :close-on-back="false"
    :close-on-content-click="false"
    theme="dark"
    :model-value="overlayOpened"
    @update:model-value.stop
  >
    <v-progress-circular
      indeterminate
      theme="light"
      color="primary"
      class="w-100"
      size="100"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  loading: boolean
}>()

const overlayOpened = ref(false)

watch(
  () => props.loading,
  () => {
    if (
      props.loading &&
      document.body.clientHeight - document.documentElement.clientHeight > 1
    ) {
      const root = document.documentElement
      root.style.overflowY = 'scroll'
    } else if (!props.loading) {
      const root = document.documentElement
      root.style.overflowY = 'auto'
    }
    overlayOpened.value = props.loading
  },
)
</script>

<style scoped lang="scss"></style>
