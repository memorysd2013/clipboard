<script setup lang="ts">
import { useState } from '@/composable/useState';
import { computed } from 'vue';

const { sidePanelShow, memoryRemainPercentage } = useState;

const appVer = computed(() => import.meta.env.VITE_APP_VERSION);

const clearCache = () => {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
    });
    window.location.reload();
  });
};
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

    .divider
    .version-block
      VanButton(
        size="mini"
        icon="replay"
        @click="clearCache"
      ) Reload
      div v{{ appVer }}
</template>

<style lang="scss" scoped>
.side-panel {
  .info-item {
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
  & + .info-item {
    margin-top: 0.5rem;
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #ebebeb;
    opacity: 0.4;
    margin: 1rem 0;
  }
  .version-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    opacity: 0.6;
  }
  .side-panel-dialog {
    height: 100%;
    padding: 1rem 1.5rem;
    width: 260px;
  }
}
</style>
