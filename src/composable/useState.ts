import { ref } from 'vue';

const useStateFactor = () => {
  const addItemFormShow = ref(false);
  const toggleAddItemFormShow = (isShow: boolean | undefined = undefined) => {
    addItemFormShow.value = isShow === undefined ? !addItemFormShow.value : isShow;
  };

  return {
    addItemFormShow,
    toggleAddItemFormShow,
  };
};

export const useState = useStateFactor();
