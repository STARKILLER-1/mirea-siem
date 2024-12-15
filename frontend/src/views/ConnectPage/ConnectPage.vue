<script setup lang="ts">
import {onMounted, ref} from "vue";
import OverlayLoader from "../../components/OverlayLoader.vue";
import useVMs from "../../api/vms.ts";
import useApp from "../../store/app.ts";
import useScriptsStore from "../../store/scripts";
import useScripts from "../../api/scripts.ts";
const { getVMs } = useVMs()
const { currentHost, setCurrentHost } = useApp()
const { setScriptsList, availableScriptTypes } = useScriptsStore()
const isConnectionEstablished = ref<boolean>(false)
const connecting = ref<boolean>(false)

const selectedHost = ref<Record<string, any> | null>(null)

const handleSetConnection = (): void => {
  connecting.value = true
  setTimeout(async (): Promise<void> => {
    isConnectionEstablished.value = true
    connecting.value = false
    setCurrentHost(selectedHost.value)
    currentHost.value && setScriptsList(currentHost.value.scripts)
  }, 1000)
}

const availableHosts = ref<typeof currentHost.value[]>([])
onMounted(async () => {
  availableHosts.value = await getVMs()
  if (currentHost.value) {
    selectedHost.value = currentHost.value
    isConnectionEstablished.value = true
  }
})
</script>

<template>
  <v-card class="w-100 h-100 bg-color3 d-flex justify-center flex-column rounded-0 overflow-auto custom-scrollbar" flat>
    <v-card-text class="d-flex flex-column align-center text-color2">
      <span class="card__header">
       Установка соединения с linux
      </span>
      <div class="d-flex mx-auto card__selector">
        <v-select :items="availableHosts" item-title="name" item-value="ip_address" v-model="selectedHost" return-object @update:model-value="isConnectionEstablished = false"></v-select>
      </div>
      <v-btn :disabled="!selectedHost" color="color2" width="300" flat variant="tonal" @click="handleSetConnection">
        Установить соединение
      </v-btn>
      <span class="card__text text-success" v-if="isConnectionEstablished">
        Соединение установлено
      </span>
    </v-card-text>
  </v-card>
  <overlay-loader :loading="connecting" />
</template>

<style scoped lang="scss">
.card {
  &__header {
    font-size: 25px;
    margin-bottom: 60px;
    margin-top: 60px;
  }
  &__selector {
    width: 500px;
  }
}
</style>