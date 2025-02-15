import { ref, watch, computed } from 'vue';

import { calculateLocalStorageRemaining } from '@/util/index';

const useStateFactor = () => {
  const addItemFormShow = ref(false);
  const toggleAddItemFormShow = (isShow: boolean | Event) => {
    addItemFormShow.value = typeof isShow === 'boolean' ? isShow : !addItemFormShow.value;
  };

  const sidePanelShow = ref(false);
  const toggleSidePanelShow = (isShow: boolean | Event) => {
    sidePanelShow.value = typeof isShow === 'boolean' ? isShow : !sidePanelShow.value;
  };

  const memoryRemainPercentage = ref(0);
  const setMemoryRemainPercentage = () => {
    const { remainingPercent } = calculateLocalStorageRemaining();
    if (remainingPercent) memoryRemainPercentage.value = remainingPercent;
  };

  const isZoomOut = computed(() => addItemFormShow.value || sidePanelShow.value);

  watch(
    () => sidePanelShow.value,
    val => {
      if (val) setMemoryRemainPercentage();
    },
  );

  return {
    addItemFormShow,
    toggleAddItemFormShow,
    sidePanelShow,
    toggleSidePanelShow,
    memoryRemainPercentage,
    setMemoryRemainPercentage,
    isZoomOut,
  };
};

export const useState = useStateFactor();
