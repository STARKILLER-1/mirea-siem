<template>
  <v-dialog
      :id="Math.random().toString(36).substring(0, 9)"
      v-bind="modalOptions"
      @update:model-value="emit('close')"
  >
    <v-card>
      <v-toolbar class="border-b" dense flat :height="56">
        <template v-if="$slots['header-prepend']" #prepend>
          <slot name="header-prepend"></slot>
        </template>
        <slot name="title">
          <v-toolbar-title v-if="title" class="ml-6">
            {{ title }}
          </v-toolbar-title>
        </slot>
        <template #append>
          <slot name="header-append" v-bind="{ close: closeModal }">
            <v-btn
                v-if="!noCloseButton"
                icon="mdi-close"
                density="comfortable"
                size="small"
                @click="closeModal"
            />
          </slot>
        </template>
      </v-toolbar>

      <slot></slot>
      <v-card-actions class="justify-end px-6 py-3">
        <slot
            name="footer"
            v-bind="{
            close: closeModal,
            confirm,
            isBusy,
            cancelText,
            confirmText,
          }"
        >
          <v-btn
              variant="text"
              color="error"
              :disabled="isBusy"
              v-if="!noCancelButton"
              @click="closeModal"
          >
            {{ cancelText }}
          </v-btn>
          <v-btn v-if="!noConfirmButton" class="bg-primary" @click="confirm">
            {{ confirmText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { VDialog } from 'vuetify/components'

const props = withDefaults(
    defineProps<{
      title?: string
      confirmText?: string
      cancelText?: string
      noCancelButton?: boolean
      noConfirmButton?: boolean
      options?: VDialog['$props']
      noCloseButton?: boolean,
      isBusy?: boolean
    }>(),
    {
      title: '',
      confirmText: 'Ok',
      cancelText: 'Cancel',
      noCloseButton: false,
      noCancelButton: false,
      noConfirmButton: false,
      options: () => ({}),
    },
)

const emit = defineEmits(['confirm', 'close'])

const modalOptions = computed(() => {
  return {
    maxWidth: '500px',
    persistent: false,
    ...props.options,
  }
})

function closeModal() {
  emit('close')
}

async function confirm() {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
:deep(.v-toolbar__append) {
  margin-inline-end: 24px;
}
</style>
