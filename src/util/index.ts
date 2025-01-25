export const createFormItemID = () => {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  } else {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 11);
  }
};

// TODO test
export const calculateLocalStorageRemaining = () => {
  try {
    const testKey = '__test__';
    let testData = 'a'; // 開始以一個字元作為基底
    let totalBytes = 0;

    try {
      // 不斷增長 testData，直到 localStorage 無法再存入資料
      while (true) {
        localStorage.setItem(testKey, testData);
        testData += testData; // 將資料加倍
      }
    } catch (e) {
      // 捕捉到 QuotaExceededError 表示空間已滿
      totalBytes = testData.length / 2; // 總容量 (成功存入的最大資料量)
      localStorage.removeItem(testKey); // 清除測試資料
    }

    // 計算已使用的容量
    let usedBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // @ts-ignore
      const value = localStorage.getItem(key);
      // @ts-ignore
      usedBytes += key.length + value.length; // 計算鍵和值的大小
    }

    // 計算百分比
    const usedPercent = Number(((usedBytes / totalBytes) * 100).toFixed(2));
    const remainingPercent = Number((100 - usedPercent).toFixed(2));

    return {
      usedBytes,
      totalBytes,
      usedPercent,
      remainingPercent,
    };
  } catch (e) {
    return {};
  }
};
