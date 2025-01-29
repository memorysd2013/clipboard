import { useStorage } from '@vueuse/core';
import { computed,ref } from 'vue';

import { type Form } from '@/composable/form/type';

const FORM_KEY = 'storage-form';
const TAB_KEY = 'storage-tab';

const useFormFactor = () => {
  const storageForm = useStorage<Form.FormItem[]>(FORM_KEY, []);

  const isFormEmpty = computed(() => !storageForm.value.length);

  const addNewFormItem = (formItem: Form.FormItem) => {
    storageForm.value.push(formItem);
  };
  const updateFormItem = (formItem: Form.FormItem) => {
    const targetItem = storageForm.value.find((f) => f.id === formItem.id);
    if (targetItem) {
      targetItem.key = formItem.key;
      targetItem.value = formItem.value;
    }
  };

  const formItemOnEditing = ref<Form.FormItem | null>(null);
  const editFormItem = (formItem: Form.FormItem) => {
    formItemOnEditing.value = formItem;
  };
  const deleteFormItem = (formItem: Form.FormItem) => {
    const index = storageForm.value.findIndex((f) => f.id === formItem.id);
    if (index >= 0) {
      storageForm.value.splice(index, 1);
    }
  };
  const clearEditFormItem = () => {
    formItemOnEditing.value = null;
  };

  return {
    storageForm,
    isFormEmpty,
    addNewFormItem,
    updateFormItem,
    formItemOnEditing,
    editFormItem,
    clearEditFormItem,
    deleteFormItem,
  };
};

export const useForm = useFormFactor();
