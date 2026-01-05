<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { showDialog, showToast } from 'vant';
import { ref } from 'vue';

import { useForm } from '@/composable/form/useForm';
import { useState } from '@/composable/useState';

const { sidePanelShow, memoryRemainPercentage } = useState;
const { exportFormData, importFormData, appendFormData, validateFormData } = useForm;
const { copy, isSupported } = useClipboard();

const importInput = ref('');

const handleExport = () => {
  const dataString = exportFormData();
  if (isSupported.value) {
    copy(dataString);
    showToast({
      message: 'Data exported and copied to clipboard',
      position: 'bottom',
    });
  } else {
    // Fallback: show dialog with data
    showDialog({
      title: 'Export Data',
      message: dataString,
      confirmButtonText: 'Copy',
    }).then(() => {
      navigator.clipboard?.writeText(dataString).then(() => {
        showToast({
          message: 'Data copied to clipboard',
          position: 'bottom',
        });
      });
    });
  }
};

const handleImport = () => {
  if (!importInput.value.trim()) {
    showToast({
      message: 'Please enter JSON data',
      type: 'fail',
      position: 'bottom',
    });
    return;
  }

  // Validate format first
  if (!validateFormData(importInput.value)) {
    showDialog({
      title: 'Import Failed',
      message: 'Invalid JSON format. Please check your data and try again.',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Show dialog to choose import mode
  showDialog({
    title: 'Import Data',
    message: 'How would you like to import the data?',
    showCancelButton: true,
    confirmButtonText: 'Replace',
    cancelButtonText: 'Append',
  })
    .then(() => {
      // Replace existing data
      const success = importFormData(importInput.value);
      if (success) {
        showToast({
          message: 'Data imported successfully (replaced)',
          type: 'success',
          position: 'bottom',
        });
        importInput.value = '';
      }
    })
    .catch(() => {
      // Append to existing data
      const success = appendFormData(importInput.value);
      if (success) {
        showToast({
          message: 'Data imported successfully (appended)',
          type: 'success',
          position: 'bottom',
        });
        importInput.value = '';
      }
    });
};
</script>

<template lang="pug">
.side-panel
  VanPopup.side-panel-dialog(
    v-model:show="sidePanelShow"
    position="right"
  )
    .info Information:
    .info-item
      .info-item-title Remain memory
      VanCircle(
        :rate="memoryRemainPercentage"
        :speed="100"
        :text="`${memoryRemainPercentage}%`"
        layer-color="rgba(255,255,255,0.5)"
      )

    .info-item.import-export-section
      .info-item-title Data Management
      VanButton.import-export-button(
        type="primary"
        block
        @click="handleExport"
      ) Export Data
      VanField.import-input(
        v-model="importInput"
        type="textarea"
        rows="5"
        placeholder="Paste JSON data here..."
      )
      VanButton.import-export-button(
        type="success"
        block
        @click="handleImport"
      ) Import Data
</template>

<style lang="scss" scoped>
.side-panel {
  .info {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .info-item {
    margin-left: 0.5rem;
    margin-bottom: 1.5rem;
    .info-item-title {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
  }
  .import-export-section {
    margin-top: 1.5rem;
    .import-input {
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
      :deep(.van-field__control) {
        max-height: 150px;
        overflow-y: auto;
        resize: none;
      }
    }
    .import-export-button {
      margin-top: 0.75rem;
    }
  }
  .side-panel-dialog {
    height: 100%;
    padding: 1rem 1.5rem;
  }
}
</style>
