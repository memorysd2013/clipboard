<script setup lang="ts">
import { useState } from '@/composable/useState';
import { computed } from 'vue';

const { sidePanelShow, memoryRemainPercentage } = useState;

const appVer = computed(() => import.meta.env.VITE_APP_VERSION);
</script>

<template lang="pug">
.side-panel
  VanPopup.side-panel-dialog(
    v-model:show="sidePanelShow"
    position="right"
  )
    .info-block
      .info-item
        .info-item-title Remain memory:
        .info-item-value {{ memoryRemainPercentage }}%

    .version-block
      div v{{ appVer }}
</template>

<style lang="scss" scoped>
.side-panel {
  .info {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .info-item {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    justify-content: space-between;

    .info-item-title {
      flex: 0 0 auto;
    }
    .info-item-value {
      flex: 0 0 auto;
    }
  }

  .version-block {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    padding-top: 0.5rem;
    opacity: 0.6;
  }
  .side-panel-dialog {
    height: 100%;
    padding: 1rem 1.5rem;
    width: 260px;
  }
}
</style>
