import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'zh' | 'de';

// 创建语言状态存储
export const currentLanguage = writable<Language>('en');

// 获取浏览器语言偏好
function getBrowserLanguage(): Language {
  if (!browser) return 'en';
  
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('de')) return 'de';
  return 'en';
}

// 从本地存储获取语言设置
function getStoredLanguage(): Language {
  if (!browser) return 'en';
  
  const stored = localStorage.getItem('aasa-editor-language') as Language;
  return stored || getBrowserLanguage();
}

// 初始化语言设置
export function initLanguage() {
  const lang = getStoredLanguage();
  currentLanguage.set(lang);
}

// 切换语言
export function setLanguage(lang: Language) {
  currentLanguage.set(lang);
  if (browser) {
    localStorage.setItem('aasa-editor-language', lang);
  }
}

// 获取当前语言
export function getCurrentLanguage(): Language {
  let lang: Language = 'en';
  currentLanguage.subscribe(l => lang = l)();
  return lang;
} 