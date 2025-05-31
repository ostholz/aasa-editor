<script lang="ts">
  import { onMount } from 'svelte';
  import URLInput from '$lib/components/URLInput.svelte';
  import AASAViewer from '$lib/components/AASAViewer.svelte';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { loadAASAFromURL, createEmptyAASA } from '$lib/aasa-utils.js';
  import { initLanguage } from '$lib/i18n/index.js';
  import { t } from '$lib/i18n/translate.js';
  import type { AASAFile } from '$lib/types.js';
  
  let aasa: AASAFile | null = null;
  let loading = false;
  let error = '';
  
  onMount(() => {
    // 初始化语言设置
    initLanguage();
    // 初始化一个空的 AASA 文件
    aasa = createEmptyAASA();
  });
  
  async function handleLoadURL(event: CustomEvent<{ url: string; useProxy: boolean }>) {
    const { url, useProxy } = event.detail;
    loading = true;
    error = '';
    
    try {
      aasa = await loadAASAFromURL(url, useProxy);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load AASA file';
      console.error('Error loading AASA:', err);
    } finally {
      loading = false;
    }
  }
  
  function handleLoadFile(event: CustomEvent<{ aasa: AASAFile }>) {
    const { aasa: loadedAASA } = event.detail;
    aasa = loadedAASA;
    error = '';
  }
</script>

<svelte:head>
  <title>{$t.title} - {$t.subtitle}</title>
  <meta name="description" content={$t.subtitle} />
</svelte:head>

<div class="container">
  <header class="header">
    <div class="header-content">
      <div class="title-section">
        <h1>{$t.title}</h1>
        <p>{$t.subtitle}</p>
      </div>
      <div class="language-section">
        <LanguageSelector />
      </div>
    </div>
  </header>
  
  <main class="main">
    <URLInput on:load={handleLoadURL} on:loadFile={handleLoadFile} />
    
    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>{$t.loadingButton}</p>
      </div>
    {/if}
    
    {#if error}
      <div class="error-banner">
        <h3>{$t.errorLoadingAASA}</h3>
        <p>{error}</p>
        <details>
          <summary>{$t.troubleshootingTips}</summary>
          <ul>
            <li>{$t.ensureURLAccessible}</li>
            <li>{$t.tryCORSProxy}</li>
            <li>{$t.checkCORS}</li>
            <li>{$t.verifyFileLocation} <code>/.well-known/apple-app-site-association</code> 或 <code>/apple-app-site-association</code></li>
            <li>{$t.checkContentType}</li>
            <li>{$t.useFileUpload}</li>
          </ul>
        </details>
      </div>
    {/if}
    
    {#if aasa && !loading}
      <AASAViewer bind:aasa />
    {/if}
  </main>
  
  <footer class="footer">
    <p>
      {$t.learnMore}
      <a href="https://developer.apple.com/documentation/xcode/supporting-associated-domains" target="_blank" rel="noopener">
        Apple App Site Association
      </a>
    </p>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f7;
    color: #1d1d1f;
    line-height: 1.6;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    margin-bottom: 2rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .title-section {
    text-align: left;
  }
  
  .title-section h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #1d1d1f;
  }
  
  .title-section p {
    font-size: 1.1rem;
    color: #86868b;
    margin: 0;
  }
  
  .language-section {
    flex-shrink: 0;
  }
  
  .main {
    flex: 1;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007AFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-banner {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .error-banner h3 {
    color: #c53030;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .error-banner p {
    color: #742a2a;
    margin: 0 0 1rem 0;
  }
  
  .error-banner details {
    color: #742a2a;
  }
  
  .error-banner summary {
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .error-banner ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .error-banner li {
    margin-bottom: 0.25rem;
  }
  
  .error-banner code {
    background: #fed7d7;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 0.8rem;
  }
  
  .footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #d2d2d7;
    color: #86868b;
    font-size: 0.9rem;
  }
  
  .footer a {
    color: #007AFF;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .header-content {
      flex-direction: column;
      text-align: center;
    }
    
    .title-section {
      text-align: center;
    }
    
    .title-section h1 {
      font-size: 2rem;
    }
  }
</style>
