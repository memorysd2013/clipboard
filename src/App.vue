<script setup lang="ts">
import AddItemForm from '@/components/AddItemForm.vue';
import Header from '@/components/layout/Header.vue';
import Form from '@/components/Form.vue';
import { useForm } from '@/composable/form/useForm';
import { useState } from '@/composable/useState';

const { isFormEmpty } = useForm;
const { toggleAddItemFormShow } = useState;
</script>

<template lang="pug">
VanConfigProvider(theme="dark")
  Header

  VanEmpty(
    v-if="isFormEmpty"
    image="search"
    description="Press button to add new item."
  )
    VanButton(
      round 
      @click="toggleAddItemFormShow()"
    ) Add New Item
  Form(v-else)

  AddItemForm
  
</template>

<style lang="scss" scoped></style>
