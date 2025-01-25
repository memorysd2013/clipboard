import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
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
    console.log('formItem', formItem);
    let targetItem = storageForm.value.find((f) => f.id === formItem.id);
    console.log('targetItem', targetItem);
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
    let index = storageForm.value.findIndex((f) => f.id === formItem.id);
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
