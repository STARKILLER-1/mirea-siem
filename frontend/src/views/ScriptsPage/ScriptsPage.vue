<script setup lang="ts">
import {computed, ref, watch} from "vue";
import useScriptsStore, {AVAILABLE_STATUSES, ExtendedScript} from "../../store/scripts";
import useScripts from "../../api/scripts";
import AppModal from "../../components/base/AppModal.vue";
const { filteredScripts, scriptsFilterState, availableScriptTypes } = useScriptsStore()

const { executeScript } = useScripts()

const selectedScript = ref<ExtendedScript | null>(null)
const isModalOpen = ref<boolean>(false)
const loadMore = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)
const isFulfilled = ref<boolean>(true)
const scriptIsLoading = ref<boolean>(false)
watch(
    () => loadMore.value,
    () => {
      onObserverUpdate()
    },
)

const onObserverUpdate = (): void => {
  if (!isFulfilled.value && loadMore.value) {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        loadMoreScripts()
      }
    }, {})
    observer.value.observe(loadMore.value)
  }
}

const handleCloseModal = (): void => {
  isModalOpen.value = false
  selectedScript.value = null
}

const handleOpenModal = (script: ExtendedScript): void => {
  selectedScript.value = script
  isModalOpen.value = true
}

const handleScriptActivate = (): void => {
  isModalOpen.value = false
  if (!selectedScript.value) return

  onScriptActivated(selectedScript.value)
}

const loadMoreScripts = (): void => {
  setTimeout(() => {
    // scripts.value = [...scripts.value, ...scripts.value.splice(0, 5)]
  }, 1000)
}

const onScriptActivated = async (script: ExtendedScript) => {
  scriptIsLoading.value = true
  script.isLoading = true
  try {
    const res = await executeScript(script.id)
    setScriptStatus(script, res)

  } catch (e: any) {
    setScriptStatus(script, {
      error: e.message ?? 'В полцессе выполнения скрипта произошла ошибка',
      status: 'notExecuted',
    })

  } finally {
    script.isLoading = false
    scriptIsLoading.value = false
  }
}

const setScriptStatus = (script: ExtendedScript, res): void  => {
  // script.status = res.status === 'success' ? AVAILABLE_STATUSES['2'] :res.status === 'notExecuted' ? AVAILABLE_STATUSES['3'] : AVAILABLE_STATUSES['1']
  script.status = !res.warning ? AVAILABLE_STATUSES['2'] : res.status === 'notExecuted' ? AVAILABLE_STATUSES['3'] : AVAILABLE_STATUSES['1']
  
  script.recommendationText = res.recommendation ?? []
  script.statusText = res.warning?.join(', ') ?? ''
}

const computedRecommendationsText = computed<string[]>(() => {
  return selectedScript.value?.recommendationText?.map((text: string, key: number): string => {
  return `${key + 1}. ${text}`
}) ?? []})



const executeAllScripts = async () => {
  filteredScripts.value?.forEach((v: ExtendedScript) => {
    onScriptActivated(v)
  })
}

</script>

<template>
  <v-card class="w-100 h-100 bg-color3 d-flex flex-column rounded-0 overflow-auto custom-scrollbar pa-4 pb-0" flat>
    <div class="d-flex flex-row w-100">
      <v-combobox multiple max-width="235" label="Тип скрипта" item-title="title" item-value="title" v-model="scriptsFilterState" :items="availableScriptTypes"/>
      <v-spacer />
      <v-btn class="ml-auto mb-4" height="50" color="color2" flat variant="tonal" @click="executeAllScripts">Активировать все</v-btn>
    </div>
    <v-list-item v-for="(script, key) in filteredScripts" :key="key" @click="handleOpenModal(script)">
    <div class="d-flex flex-column text-color1 border-b" >
      <v-card-title >
        {{script.name}}

      </v-card-title>
      <v-card-subtitle >
        Категория: {{script?.category ?? '??'}}

      </v-card-subtitle>
      <v-card-text>
        {{script.description}}
      </v-card-text>
      <v-card-text class="d-flex align-center">
        <div v-if="!script.isLoading" class="card__script-status" :class="`card__script-status--${script.status.color}`" />
        <v-progress-circular v-else class="mr-3" size="20" indeterminate />
        {{script.status.title}}
      </v-card-text>
      <v-card-text>
        {{script.warning?.join(', ') ?? ''}}
      </v-card-text>
    </div>
    </v-list-item>
    <div v-if="!isFulfilled" class="d-flex w-100 text-color1" ref="loadMore">
      <v-progress-circular size="30" class="ma-auto my-3" indeterminate />
    </div>
  </v-card>
  <app-modal :title="selectedScript?.name" :model-value="isModalOpen" @close="handleCloseModal" @confirm="handleScriptActivate" confirm-text="Запустить" :no-confirm-button="selectedScript?.isLoading">
    <v-card-text>
      {{selectedScript?.description}}
    </v-card-text>
    <v-card-text class="d-flex align-center">
      <div v-if="!selectedScript?.isLoading" class="card__script-status" :class="`card__script-status--${selectedScript?.status.color}`" />
      <v-progress-circular v-else class="mr-3" size="20" indeterminate />
      {{selectedScript?.status.title}}
    </v-card-text>
    <v-card-text>
      {{selectedScript?.statusText}}
    </v-card-text>
    <v-card-text v-if="computedRecommendationsText.length">
      Рекомендации:
    </v-card-text>
    <v-card-text v-for="(recommendation, key) in computedRecommendationsText" :key="key">
      {{recommendation}}
    </v-card-text>
  </app-modal>
</template>

<style scoped lang="scss">
.card {
  &__script-status {
    display: flex;
    width: 20px;
    height: 20px;
    margin-bottom: 2px;
    margin-right: 12px;
    border-radius: 100%;
    &--grey {
      background-color: #8d97ad;
    }
    &--red {
      background-color: #ff0000;
    }
    &--green {
      background-color: #35ff00;
    }
    &--black {
      background-color: #000000;
    }
  }
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
