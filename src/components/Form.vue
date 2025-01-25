<script setup lang="ts">
import { useForm } from '@/composable/form/useForm';
import { ref, nextTick } from 'vue';
import { useClipboard } from '@vueuse/core';
import { showToast, showDialog, type ToastWrapperInstance } from 'vant';
import { type Form } from '@/composable/form/type';
import { useState } from '@/composable/useState';

const { toggleAddItemFormShow } = useState;

const active = ref(0);

const { storageForm, editFormItem, deleteFormItem } = useForm;
const { text, copy, copied, isSupported } = useClipboard();

const clickedValue = ref('');
const toastInstance = ref<ToastWrapperInstance | null>(null);

const showBottomToast = (message: string) => {
  if (toastInstance.value) {
    toastInstance.value?.close();
  }
  nextTick(() => {
    toastInstance.value = showToast({
      message,
      position: 'bottom',
    });
  });
};
const onCellClick = (val: string) => {
  if (isSupported.value) {
    copy(val);
    showBottomToast(`Copied: ${val}`);
  } else {
    showBottomToast('Your browser does not support Clipboard API');
  }
};

const onDelete = (item: Form.FormItem) => {
  showDialog({
    message: 'Are you sure you want to delete?',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  })
    .then(() => {
      deleteFormItem(item);
    })
    .catch(() => {});
};
</script>

<template lang="pug">
// TODO
//- VanTabs(v-model:active="active" sticky)
//-   VanTab(v-for="(group, key, index) in form" :title="key")
.form
  VanCellGroup(inset)
    template(v-for="item in storageForm")
      VanSwipeCell
        VanField(
          :label="item.key"
          type="textarea"
          size="large"
          rows="1"
          autosize
          readonly
          @click="onCellClick(item.value)"
        )
          template(#input)
            .field-value {{ item.value }}
            // TODO
            //- VanTextEllipsis(
            //-   :content="item.value"
            //-   position="middle"
            //-   expand-text="expand"
            //-   collapse-text="collapse"
            //- )
        template(#right)
          VanButton(square class="form-operator-button" type="primary" @click="editFormItem(item)")
            VanIcon(name="edit")
          VanButton(square class="form-operator-button" type="danger" @click="onDelete(item)")
            VanIcon(name="delete-o")

  .add-item-block(@click="toggleAddItemFormShow()")
    VanIcon(name="plus")
    span.add-text Add New Item

</template>

<style lang="scss" scoped>
.form {
  .cell-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .field-value {
    color: var(--van-cell-value-color);
    white-space: pre;
    max-height: 120px;
    width: 100%;
    overflow-y: auto;
  }
  .form-operator-button {
    height: 100%;
  }

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
}
</style>
