<script setup lang="ts">
import {Table} from "../../namespaces/table";

interface Props {
  items: Record<string, any>[]
  columns: Table.Column[]
}

const props = defineProps<Props>()

</script>

<template>
  <v-card class=" pa-0 my-4 overflow-auto custom-scrollbar">
    <v-table class="table pa-2 w-100">
      <thead class="text-accent">
      <td v-for="(col, key) in columns" :key="key" class="text- table__head pa-2">
        {{ col.type !== 'actions' ? col.label : '' }}
      </td>
      </thead>
      <tbody>
      <tr v-if="!items.length">
        <td :colspan="columns.length" class="text-center text-color1">Данные отсутствуют</td>
      </tr>
      <tr v-for="(item, index)  in items" :key="index">
        <td v-for="(column, key) in columns.filter((col) => col.type !== 'actions')"
            :class="column.name === 'priority' ? item[column.name] === 'WARNING' ? 'text-warning' : 'text-info' : 'text-color1'"
            class="px-2 " :key="key">
          {{ item[column.name] ?? '-' }}
        </td>
        <td v-if="item['actions']" class="pa-0" width="1">
          <slot name="actions">
            <v-menu location="bottom end" scroll-strategy="close">
              <template #activator="{ props }">
                <v-btn
                    variant="tonal"
                    color="grey-lighten-1"
                    icon="mdi-menu"
                    density="compact"
                    rounded="sm"
                    v-bind="props"
                />
              </template>
              <v-list class="text-color1" density="compact" elevation="1">
                <v-list-item
                    v-for="action in item['actions']"
                    class="px-3 gap-8"
                    link
                    @click="action.value()"
                >
                  {{ action.title }}
                </v-list-item>
              </v-list>
            </v-menu>
          </slot>
        </td>
      </tr>
      </tbody>
    </v-table>

  </v-card>
</template>


<style scoped lang="scss">
.table {
  &__head {
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>