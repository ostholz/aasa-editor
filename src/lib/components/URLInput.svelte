<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { AASAFile } from '../types.js';
  import { validateAASAStructure } from '../aasa-utils.js';
  import { t } from '../i18n/translate.js';
  
  const dispatch = createEventDispatcher<{
    load: { url: string; useProxy: boolean };
    loadFile: { aasa: AASAFile };
  }>();
  
  let url = '';
  let useProxy = false;
  let loading = false;
  let error = '';
  let fileInput: HTMLInputElement;
  
  const commonUrls = [
    'https://example.com/.well-known/apple-app-site-association',
    'https://example.com/apple-app-site-association',
    'https://developer.apple.com/.well-known/apple-app-site-association'
  ];
  
  const exampleAASA: AASAFile = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "ABCDE12345.com.example.app",
          paths: ["*"],
          components: [
            {
              "/": "/products/*",
              comment: "Matches any URL with a path that starts with /products/"
            }
          ]
        }
      ]
    }
  };
  
  async function handleLoad() {
    if (!url.trim()) {
      error = $t.enterURL;
      return;
    }
    
    try {
      new URL(url); // Validate URL format
    } catch {
      error = $t.enterValidURL;
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      dispatch('load', { url: url.trim(), useProxy });
    } finally {
      loading = false;
    }
  }
  
  function setCommonUrl(commonUrl: string) {
    url = commonUrl;
    error = '';
  }
  
  function loadExample() {
    dispatch('loadFile', { aasa: exampleAASA });
  }
  
  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;
    
    if (!file.name.includes('apple-app-site-association') && !file.name.endsWith('.json')) {
      error = $t.selectAASAFile;
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        const aasa = validateAASAStructure(data);
        dispatch('loadFile', { aasa });
        error = '';
      } catch (err) {
        error = `${$t.invalidAASAFile}: ${err instanceof Error ? err.message : 'Unknown error'}`;
      }
    };
    
    reader.onerror = () => {
      error = $t.failedToReadFile;
    };
    
    reader.readAsText(file);
  }
  
  function triggerFileUpload() {
    fileInput.click();
  }
</script>

<div class="url-input">
  <h2>{$t.loadAASAFile}</h2>
  
  <!-- URL Input Section -->
  <div class="section">
    <h3>{$t.fromURL}</h3>
    <div class="input-group">
      <input
        type="url"
        bind:value={url}
        placeholder={$t.urlPlaceholder}
        class="url-field"
        disabled={loading}
        on:keydown={(e) => e.key === 'Enter' && handleLoad()}
      />
      <button
        type="button"
        on:click={handleLoad}
        disabled={loading || !url.trim()}
        class="load-btn"
      >
        {loading ? $t.loadingButton : $t.loadButton}
      </button>
    </div>
    
    <div class="options">
      <label class="checkbox-label">
        <input
          type="checkbox"
          bind:checked={useProxy}
          disabled={loading}
        />
        {$t.useCORSProxy}
      </label>
    </div>
    
    {#if error}
      <div class="error">{error}</div>
    {/if}
    
    <div class="common-urls">
      <p>{$t.commonURLs}</p>
      {#each commonUrls as commonUrl}
        <button
          type="button"
          class="common-url-btn"
          on:click={() => setCommonUrl(commonUrl)}
          disabled={loading}
        >
          {commonUrl}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- File Upload Section -->
  <div class="section">
    <h3>{$t.fromFile}</h3>
    <input
      bind:this={fileInput}
      type="file"
      accept=".json,application/json"
      on:change={handleFileUpload}
      style="display: none;"
    />
    <button
      type="button"
      class="upload-btn"
      on:click={triggerFileUpload}
      disabled={loading}
    >
      {$t.uploadAASAFile}
    </button>
    <p class="help-text">{$t.uploadHelp}</p>
  </div>
  
  <!-- Example Section -->
  <div class="section">
    <h3>{$t.example}</h3>
    <button
      type="button"
      class="example-btn"
      on:click={loadExample}
      disabled={loading}
    >
      {$t.loadExampleAASA}
    </button>
    <p class="help-text">{$t.exampleHelp}</p>
  </div>
</div>

<style>
  .url-input {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }
  
  .section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  .section h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .url-field {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .url-field:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
  
  .load-btn, .upload-btn, .example-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .load-btn {
    background: #007AFF;
    color: white;
  }
  
  .load-btn:hover:not(:disabled) {
    background: #0056CC;
  }
  
  .upload-btn {
    background: #34C759;
    color: white;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .upload-btn:hover:not(:disabled) {
    background: #28A745;
  }
  
  .example-btn {
    background: #FF9500;
    color: white;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .example-btn:hover:not(:disabled) {
    background: #E6850E;
  }
  
  .load-btn:disabled, .upload-btn:disabled, .example-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .options {
    margin-bottom: 1rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    margin: 0;
  }
  
  .error {
    color: #FF3B30;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 4px;
  }
  
  .common-urls p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .common-url-btn {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    color: #007AFF;
  }
  
  .common-url-btn:hover:not(:disabled) {
    background: #e9ecef;
  }
  
  .common-url-btn:disabled {
    color: #999;
    cursor: not-allowed;
  }
  
  .help-text {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
  }
</style> 