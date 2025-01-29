<script setup lang="ts">
import { showToast } from 'vant';
import { nextTick, onMounted, ref, watch } from 'vue';

import { useForm } from '@/composable/form/useForm';
import { useState } from '@/composable/useState';
import { createFormItemID } from '@/util/index';

type Form = {
  itemName: string;
  itemValue: string;
  id: string;
};

const { addItemFormShow, toggleAddItemFormShow } = useState;
const { addNewFormItem, updateFormItem, formItemOnEditing, clearEditFormItem } = useForm;

const Form = {
  itemName: '',
  itemValue: '',
  id: '',
  // isPassword: false,
};

const form = ref<Form>(JSON.parse(JSON.stringify(Form)));

const resetFrom = () => {
  Object.assign(form.value, Form);
};

onMounted(() => {
  resetFrom();
});

watch(formItemOnEditing, (formItem) => {
  if (formItem?.id) {
    form.value.itemName = formItem.key;
    form.value.itemValue = formItem.value;
    form.value.id = formItem.id;
    toggleAddItemFormShow(true);
  } else {
    resetFrom();
  }
});

// TODO: move to useForm?
// TODO: validate same name?
const formValidate = () => {
  if (!form.value.itemName || !form.value.itemName) return false;
  return true;
};

const onSubmit = () => {
  const isValidate = formValidate();
  if (!isValidate) {
    showToast({
      message: 'please check required field',
      position: 'bottom',
    });
    return;
  }
  if (form.value.id) {
    updateFormItem({
      key: form.value.itemName,
      value: form.value.itemValue,
      id: form.value.id,
    });
  } else {
    addNewFormItem({
      key: form.value.itemName,
      value: form.value.itemValue,
      id: createFormItemID(),
    });
  }
  nextTick(() => {
    toggleAddItemFormShow(false);
    resetFrom();
  });
};

const onPopupClose = () => {
  // clean up edit form item
  clearEditFormItem();
};
</script>

<template lang="pug">
VanPopup(
  v-model:show="addItemFormShow"
  round
  lock-scroll
  @closed="onPopupClose"
)
  VanCellGroup
    VanField(
      v-model="form.itemName"
      label="Name"
      placeholder="name"
      maxlength="50"
      show-word-limit
      required
      autocomplete="off"
    )
    VanField(
      v-model="form.itemValue"
      label="Value"
      placeholder="value"
      maxlength="100"
      type="textarea"
      show-word-limit
      required
      autocomplete="off"
    )
    .button-wrapper
      VanButton(
        plain
        @click="onSubmit"
      ) Submit

</template>

<style lang="less" scoped>
.button-wrapper {
  display: flex;
  justify-content: right;
  padding: 1rem;
  .van-button {
    & + .van-button {
      margin-left: 1rem;
    }
  }
}
</style>
