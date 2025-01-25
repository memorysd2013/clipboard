<script setup lang="ts">
import { useState } from '@/composable/useState';

const { sidePanelShow, memoryRemainPercentage } = useState;
</script>

<template lang="pug">
.side-panel
  VanPopup(
    v-model:show="sidePanelShow"
    position="right"
    class="side-panel-dialog"
  )
    div.info Information:
    div.info-item
      div.info-item-title Remain memory
      VanCircle(
        :rate="memoryRemainPercentage"
        :speed="100"
        :text="`${memoryRemainPercentage}%`"
        layer-color="rgba(255,255,255,0.5)"
      )
    
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
    .info-item-title {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
  }
  .side-panel-dialog {
    height: 100%;
    padding: 1rem 1.5rem;
  }
}
</style>
