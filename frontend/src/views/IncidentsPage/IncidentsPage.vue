<script setup lang="ts">
import DataTable from "../../components/data-table/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import {Table} from "../../namespaces/table";
import {IncidentItem, Priority} from "../../namespaces/incidents";
import {COLUMNS} from "../../table-configs/incidents";
import AppModal from "../../components/base/AppModal.vue";
import useApp from "../../store/app.ts";
import useVMs from "../../api/vms.ts";
// import IncidentItem = Incidents.IncidentItem;
const { currentHost } = useApp()
const { getVMOutput } = useVMs()

// const apiItems = ref([//emulating objects from backend
//   {
//     time: '18:33',
//     date: '07.04.2024',
//     label: 'test',
//     priority: "info" as Incidents.Priority,
//   },
//   {
//     time: '18:33',
//     date: '07.04.2024',
//     label: 'test',
//     priority: "info" as Incidents.Priority,
//   },
// ])

const apiItems = ref<IncidentItem[]>([])

const itemToPreview = ref()
const isPreviewModalOpen = ref<boolean>(false)

const items = computed( () => apiItems.value?.map((item, index) => {
  console.log(item)
  return {
    ...item,
    actions: [
      {
        title: 'Показать подробности',
        value: () => openInfoModal(item)
      }
    ],
  }
}))

const openInfoModal = (item) => {
  itemToPreview.value = item
  isPreviewModalOpen.value = true
}

onMounted(async () => {
  apiItems.value = await getVMOutput(currentHost.value!.id)
  console.log(apiItems)
})

</script>

<template>
  <v-card class="w-100 h-100 bg-color3 px-6 d-flex flex-column rounded-0 overflow-auto custom-scrollbar" flat>
    <v-card-title class="pl-0 text-color1 font-weight-bold page__title pt-4">
      Инциденты
    </v-card-title>
    <v-card-subtitle class="pa-0">
      Хост: {{ currentHost?.ip_address }}
    </v-card-subtitle>
<!--    {{ items }}-->
<!--    {{ apiItems }}-->
    <data-table :columns="COLUMNS" :items="items" />
  </v-card>
  <app-modal v-model="isPreviewModalOpen" @confirm="isPreviewModalOpen = false" @close="isPreviewModalOpen = false" title="Подробности" no-cancel-button>
    <v-card-text class="text-surface-variant">
      Описание: {{ itemToPreview.warning.join('\n') }}
    </v-card-text>
  </app-modal>
</template>

<style scoped lang="scss">
.page {
  &__title {
    font-size: 28px;
  }
}
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