<script setup lang="ts">
import AddItemForm from '@/components/AddItemForm.vue';
import Form from '@/components/Form.vue';
import Header from '@/components/layout/Header.vue';
import SidePanel from '@/components/SidePanel.vue';
import { useForm } from '@/composable/form/useForm';
import { useState } from '@/composable/useState';

const { isFormEmpty } = useForm;
const { toggleAddItemFormShow, isZoomOut } = useState;
</script>

<template lang="pug">
VanConfigProvider(theme="dark")
  .main-container(:class="{ 'zoom-out': isZoomOut }")
    Header

    VanEmpty(
      v-if="isFormEmpty"
      image="search"
      description="Press button to add new item."
    )
      VanButton(
        round
        @click="toggleAddItemFormShow"
      ) Add New Item
    Form(v-else)

  AddItemForm
  SidePanel
</template>

<style lang="scss" scoped>
.main-container {
  transition: all 0.3s;
  &.zoom-out {
    transform: scale(0.9);
    filter: blur(2px);
  }
}
</style>
