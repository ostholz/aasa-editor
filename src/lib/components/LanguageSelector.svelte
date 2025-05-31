<script lang="ts">
  import { currentLanguage, setLanguage, type Language } from '../i18n/index.js';
  import { t } from '../i18n/translate.js';
  
  const languages: { code: Language; flag: string }[] = [
    { code: 'en', flag: '🇺🇸' },
    { code: 'zh', flag: '🇨🇳' },
    { code: 'de', flag: '🇩🇪' }
  ];
  
  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
  }
</script>

<div class="language-selector">
  <label class="label">
    {$t.language}:
  </label>
  <div class="language-buttons">
    {#each languages as { code, flag }}
      <button
        type="button"
        class="language-btn"
        class:active={$currentLanguage === code}
        on:click={() => handleLanguageChange(code)}
        title={code === 'en' ? $t.english : code === 'zh' ? $t.chinese : $t.german}
      >
        <span class="flag">{flag}</span>
        <span class="name">
          {code === 'en' ? $t.english : code === 'zh' ? $t.chinese : $t.german}
        </span>
      </button>
    {/each}
  </div>
</div>

<style>
  .language-selector {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
  }
  
  .label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
  
  .language-buttons {
    display: flex;
    gap: 0.25rem;
    background: #f8f9fa;
    border-radius: 6px;
    padding: 0.25rem;
  }
  
  .language-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    font-size: 0.8rem;
    color: #666;
    transition: all 0.2s ease;
  }
  
  .language-btn:hover {
    background: #e9ecef;
    color: #333;
  }
  
  .language-btn.active {
    background: #007AFF;
    color: white;
    box-shadow: 0 1px 3px rgba(0, 122, 255, 0.3);
  }
  
  .flag {
    font-size: 1rem;
  }
  
  .name {
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .language-selector {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .language-buttons {
      width: 100%;
      justify-content: space-between;
    }
    
    .language-btn {
      flex: 1;
      justify-content: center;
    }
  }
</style> 