<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { showDialog, showToast, type ToastWrapperInstance } from 'vant';
import { nextTick, ref } from 'vue';
import Draggable from 'vuedraggable';

import { type Form } from '@/composable/form/type';
import { useForm } from '@/composable/form/useForm';
import { useRipple } from '@/composable/useRipple';
import { useState } from '@/composable/useState';

const { lockDraggable, setLockDraggable, toggleAddItemFormShow } = useState;

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
    Draggable(
      v-model="storageForm"
      :disabled="lockDraggable"
      item-key="id"
    )
      template(#item="{ element }")
        VanSwipeCell(:disabled="!lockDraggable")
          VanField.field-with-ripple(
            :label="element.key"
            type="textarea"
            size="large"
            rows="1"
            autosize
            readonly
            @click="handleCellClick($event, item.value)"
          )
            template(#input)
              .field-value {{ element.value }}
              // TODO
              //- VanTextEllipsis(
              //-   :content="element.value"
              //-   position="middle"
              //-   expand-text="expand"
              //-   collapse-text="collapse"
              //- )
          template(#right)
            VanButton.form-operator-button(
              square
              type="primary"
              @click="editFormItem(element)"
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
              @click="onDelete(element)"
            )
              VanIcon(name="delete-o")

  .form-bottom.van-safe-area-bottom
    .form-bottom-item-wrapper(@click="toggleAddItemFormShow")
      VanIcon(name="plus")
      span.add-text Add New Item

    // TODO: state migration
    .form-bottom-item-wrapper(@click="() => setLockDraggable(!lockDraggable)")
      VanIcon.icon-animation(
        name="exchange"
        :class="{ rotate: lockDraggable }"
      )
      span.add-text {{ lockDraggable ? 'Order exchange' : 'Edit content' }}
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

  .form-bottom {
    position: sticky;
    bottom: 0;
    background-color: var(--color-background);
    line-height: var(--van-cell-line-height);
    display: flex;
    justify-content: space-evenly;
    .form-bottom-item-wrapper {
      padding: 0.875rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .add-text {
        margin-left: 0.5rem;
      }
      .rotate {
        transform: rotate(90deg);
      }
      .icon-animation {
        transition: transform 0.2s;
      }
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
