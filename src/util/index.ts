export const createFormItemID = () => {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  } else {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 11);
  }
};
