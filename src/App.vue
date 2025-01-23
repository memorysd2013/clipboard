<script setup lang="ts">
import { Button, ConfigProvider, Cell, CellGroup } from 'vant';
import AddItemForm from '@/components/AddItemForm.vue';
import Header from '@/components/layout/Header.vue';
import Form from '@/components/Form.vue';
import { useState } from '@/composable/useState';

const { toggleAddItemFormShow } = useState;
</script>

<template lang="pug">
ConfigProvider(theme="dark")
  Header
  Form

  .add-item-block(@click="toggleAddItemFormShow()")
    VanIcon(name="plus")
    span.add-text Add New Item

  AddItemForm
  
</template>

<style lang="scss" scoped>
.add-item-block {
  line-height: var(--van-cell-line-height);
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  display: flex;
  align-items: center;
  justify-content: center;

  .add-text {
    margin-left: 0.5rem;
  }
}
</style>
