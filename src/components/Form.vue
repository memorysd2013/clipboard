<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { showDialog, showToast, type ToastWrapperInstance } from 'vant';
import { nextTick, ref } from 'vue';

import { type Form } from '@/composable/form/type';
import { useForm } from '@/composable/form/useForm';
import { useRipple } from '@/composable/useRipple';
import { useState } from '@/composable/useState';

const { toggleAddItemFormShow } = useState;

const active = ref(0);

const { storageForm, editFormItem, deleteFormItem } = useForm;
const { text, copy, copied, isSupported } = useClipboard();

const clickedValue = ref('');
const toastInstance = ref<ToastWrapperInstance | null>(null);

// Ripple effect configuration variables
const rippleColor = 'rgba(255, 255, 255, 0.5)'; // Ripple color
const rippleDuration = 1000; // Ripple animation duration (milliseconds)

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

const handleCellClick = (event: MouseEvent, val: string) => {
  // Create ripple effect
  const target = event.currentTarget as HTMLElement;
  // Find element with field-with-ripple class (VanField root element)
  const fieldElement = target.closest('.field-with-ripple') as HTMLElement;
  if (fieldElement) {
    const { createRipple } = useRipple(fieldElement, {
      color: rippleColor,
      duration: rippleDuration,
    });
    createRipple(event);
  }

  // Execute original click logic
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
.form(:style="{ '--ripple-duration': `${rippleDuration}ms` }")
  VanCellGroup(inset)
    template(v-for="item in storageForm")
      VanSwipeCell
        VanField.field-with-ripple(
          :label="item.key"
          type="textarea"
          size="large"
          rows="1"
          autosize
          readonly
          @click="handleCellClick($event, item.value)"
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
          VanButton.form-operator-button(
            square
            type="primary"
            @click="editFormItem(item)"
          )
            VanIcon(name="edit")
          //- VanButton.form-operator-button(
          //-   square
          //-   color="#707070"
          //-   @click="togglePopover(index)"
          //- )
            VanIcon(name="ellipsis")
          VanButton.form-operator-button(
            square
            type="danger"
            @click="onDelete(item)"
          )
            VanIcon(name="delete-o")

  .add-item-block(@click="toggleAddItemFormShow")
    VanIcon(name="plus")
    span.add-text Add New Item
</template>

<style lang="scss" scoped>
.form {
  .field-with-ripple {
    position: relative;
    overflow: hidden;
  }

  .field-value {
    color: var(--van-cell-value-color);
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 120px;
    width: 100%;
    overflow-y: auto;
  }
  .form-operator-button {
    height: 100%;
  }

  .add-item-block {
    position: sticky;
    bottom: 0;
    background-color: var(--color-background);
    line-height: var(--van-cell-line-height);
    padding: 0.875rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .add-text {
      margin-left: 0.5rem;
    }
  }
}

// Ripple effect styles (global, because ripple elements are dynamically created)
:global(.ripple-effect) {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  opacity: 1;
  pointer-events: none;
  will-change: transform, opacity;
}

:global(.ripple-active) {
  animation: ripple-animation var(--ripple-duration, 600ms) cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes ripple-animation {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
