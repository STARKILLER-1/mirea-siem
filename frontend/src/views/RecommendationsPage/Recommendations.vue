<script setup lang="ts">

import {ref} from "vue";
import OverlayLoader from "../../components/OverlayLoader.vue";

const isConnectionEstablished = ref<boolean>(false)
const connecting = ref<boolean>(false)
const handleSetConnection = (): void => {
  connecting.value = true
  setTimeout((): void => {
    isConnectionEstablished.value = true
    connecting.value = false
  }, 1000)
}
</script>

<template>
  <v-card class="w-100 h-100 bg-color3 d-flex justify-center flex-column rounded-0 overflow-auto custom-scrollbar" flat>

  </v-card>
</template>

<style scoped lang="scss">
.card {
  &__header {
    font-size: 20px;
    margin-bottom: 60px;
  }
  &__text {
    &--success {
      color: #33374d;
    }
  }
}
</style>