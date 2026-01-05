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

  // Export form data as JSON string
  const exportFormData = (): string => {
    return JSON.stringify(storageForm.value, null, 2);
  };

  // Validate JSON string format without importing
  const validateFormData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        // Validate each item has required fields
        return parsed.every(
          (item: unknown) =>
            typeof item === 'object' &&
            item !== null &&
            'key' in item &&
            'value' in item &&
            'id' in item &&
            typeof (item as Form.FormItem).key === 'string' &&
            typeof (item as Form.FormItem).value === 'string' &&
            typeof (item as Form.FormItem).id === 'string'
        );
      }
      return false;
    } catch {
      return false;
    }
  };

  // Import form data from JSON string (replace existing data)
  const importFormData = (jsonString: string): boolean => {
    if (!validateFormData(jsonString)) {
      return false;
    }
    try {
      const parsed = JSON.parse(jsonString) as Form.FormItem[];
      storageForm.value = parsed;
      return true;
    } catch {
      return false;
    }
  };

  // Append form data from JSON string (add to existing data)
  const appendFormData = (jsonString: string): boolean => {
    if (!validateFormData(jsonString)) {
      return false;
    }
    try {
      const parsed = JSON.parse(jsonString) as Form.FormItem[];
      storageForm.value.push(...parsed);
      return true;
    } catch {
      return false;
    }
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
    exportFormData,
    importFormData,
    appendFormData,
    validateFormData,
  };
};

export const useForm = useFormFactor();
