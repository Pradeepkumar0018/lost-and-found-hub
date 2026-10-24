export const getStorageItem = (key, fallbackValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallbackValue;
  } catch (error) {
    console.error(`Error reading ${key} from LocalStorage:`, error);
    return fallbackValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in LocalStorage:`, error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from LocalStorage:`, error);
  }
};
