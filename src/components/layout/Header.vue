<script setup lang="ts">
import { useState } from '@/composable/useState';

const { toggleSidePanelShow } = useState;
</script>

<template lang="pug">
#header 
  div EZ Copy
  VanIcon(
    name="info-o"
    size="18"
    @click="toggleSidePanelShow"
  )
</template>

<style lang="less" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}
</style>
