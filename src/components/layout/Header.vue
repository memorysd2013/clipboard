<script setup>
import { useState } from '@/composable/useState';

const { toggleAddItemFormShow } = useState;
</script>

<template lang="pug">
#header 
  div Clipboard
  VanButton(size="small" @click="toggleAddItemFormShow()") Add Item
</template>

<style lang="less" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}
</style>
