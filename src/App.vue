<script setup lang="ts">
import { Button, ConfigProvider, Cell, CellGroup } from 'vant';
import AddItemForm from '@/components/AddItemForm.vue';
import Header from '@/components/layout/Header.vue';
import Form from '@/components/Form.vue';
</script>

<template lang="pug">
ConfigProvider(theme="dark")
  Header
  Form
  AddItemForm
  
</template>

<style scoped></style>
