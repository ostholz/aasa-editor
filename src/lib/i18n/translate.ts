import { derived } from 'svelte/store';
import { currentLanguage } from './index.js';
import { translations, type Translations } from './translations.js';

// 创建响应式翻译存储
export const t = derived(
  currentLanguage,
  ($currentLanguage) => translations[$currentLanguage]
);

// 获取当前翻译的函数（用于非响应式上下文）
export function getTranslations(): Translations {
  let currentTranslations: Translations = translations.en;
  currentLanguage.subscribe(lang => {
    currentTranslations = translations[lang];
  })();
  return currentTranslations;
} 