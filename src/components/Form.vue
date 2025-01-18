<script setup>
import { useForm } from '@/composable/form/useForm';
import { ref, nextTick } from 'vue';
import { useClipboard } from '@vueuse/core';
import { showToast } from 'vant';

const active = ref(0);

const { form, editFormItem, deleteFormItem } = useForm;
const { text, copy, copied, isSupported } = useClipboard();

const clickedValue = ref('');
const toastInstance = ref(null);

const showBottomToast = (message) => {
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
const onCellClick = (val) => {
  if (isSupported.value) {
    copy(val);
    showBottomToast(`Copied: ${val}`);
  } else {
    showBottomToast('Your browser does not support Clipboard API');
  }
};
</script>

<template lang="pug">
// TODO
//- VanTabs(v-model:active="active" sticky)
//-   VanTab(v-for="(group, key, index) in form" :title="key")
VanCellGroup
  template(v-for="item in form")
    VanSwipeCell
      VanField(
        :label="item.key"
        type="textarea"
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
        VanButton(square class="form-operator-button" type="danger" @click="deleteFormItem(item)")
          VanIcon(name="delete-o")
            
</template>

<style lang="scss" scoped>
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
</style>
