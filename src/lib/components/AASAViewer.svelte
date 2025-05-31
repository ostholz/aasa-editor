<script lang="ts">
  import type { AASAFile } from '../types.js';
  import AppDetailEditor from './AppDetailEditor.svelte';
  import { createEmptyAppDetail } from '../aasa-utils.js';
  import { t } from '../i18n/translate.js';
  
  export let aasa: AASAFile;
  
  let editingIndex = -1;
  
  function addNewAppDetail() {
    aasa.applinks.details = [...aasa.applinks.details, createEmptyAppDetail()];
    editingIndex = aasa.applinks.details.length - 1;
  }
  
  function removeAppDetail(index: number) {
    aasa.applinks.details = aasa.applinks.details.filter((_, i) => i !== index);
    if (editingIndex === index) {
      editingIndex = -1;
    } else if (editingIndex > index) {
      editingIndex--;
    }
  }
  
  function exportAASA() {
    const dataStr = JSON.stringify(aasa, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'apple-app-site-association';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
</script>

<div class="aasa-viewer">
  <div class="header">
    <h2>{$t.aasaConfiguration}</h2>
    <div class="actions">
      <button type="button" on:click={addNewAppDetail} class="add-btn">
        {$t.addAppDetail}
      </button>
      <button type="button" on:click={exportAASA} class="export-btn">
        {$t.exportAASA}
      </button>
    </div>
  </div>
  
  <div class="summary">
    <div class="stat">
      <span class="label">{$t.apps}</span>
      <span class="value">{aasa.applinks.details.length}</span>
    </div>
    <div class="stat">
      <span class="label">{$t.totalPaths}</span>
      <span class="value">
        {aasa.applinks.details.reduce((sum, detail) => sum + (detail.paths?.length || 0), 0)}
      </span>
    </div>
    <div class="stat">
      <span class="label">{$t.totalComponents}</span>
      <span class="value">
        {aasa.applinks.details.reduce((sum, detail) => sum + (detail.components?.length || 0), 0)}
      </span>
    </div>
  </div>
  
  <div class="app-details">
    {#each aasa.applinks.details as detail, index}
      <div class="app-detail-card">
        <div class="card-header">
          <h3>{$t.appDetail} {index + 1}</h3>
          <div class="card-actions">
            <button
              type="button"
              on:click={() => editingIndex = editingIndex === index ? -1 : index}
              class="edit-btn"
            >
              {editingIndex === index ? $t.close : $t.edit}
            </button>
            <button
              type="button"
              on:click={() => removeAppDetail(index)}
              class="remove-btn"
            >
              {$t.remove}
            </button>
          </div>
        </div>
        
        <div class="card-content">
          <div class="app-id">
            <strong>{$t.appID}</strong> {detail.appID || $t.notSet}
          </div>
          
          {#if detail.paths && detail.paths.length > 0}
            <div class="paths">
              <strong>{$t.paths} ({detail.paths.length}):</strong>
              <ul>
                {#each detail.paths as path}
                  <li><code>{path}</code></li>
                {/each}
              </ul>
            </div>
          {/if}
          
          {#if detail.components && detail.components.length > 0}
            <div class="components">
              <strong>{$t.components} ({detail.components.length}):</strong>
              <ul>
                {#each detail.components as component}
                  <li>
                    <code>{component['/']}</code>
                    {#if component.comment}
                      <span class="comment">- {component.comment}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        
        {#if editingIndex === index}
          <div class="editor">
            <AppDetailEditor bind:detail={aasa.applinks.details[index]} />
          </div>
        {/if}
      </div>
    {/each}
    
    {#if aasa.applinks.details.length === 0}
      <div class="empty-state">
        <p>{$t.noAppDetails}</p>
        <button type="button" on:click={addNewAppDetail} class="add-btn">
          {$t.addFirstAppDetail}
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .aasa-viewer {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .add-btn, .export-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .add-btn {
    background: #34C759;
    color: white;
  }
  
  .add-btn:hover {
    background: #28A745;
  }
  
  .export-btn {
    background: #007AFF;
    color: white;
  }
  
  .export-btn:hover {
    background: #0056CC;
  }
  
  .summary {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat .label {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  
  .stat .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #007AFF;
  }
  
  .app-detail-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-bottom: 1px solid #ddd;
  }
  
  .card-header h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .card-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .edit-btn, .remove-btn {
    padding: 0.25rem 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .edit-btn {
    background: #007AFF;
    color: white;
  }
  
  .edit-btn:hover {
    background: #0056CC;
  }
  
  .remove-btn {
    background: #FF3B30;
    color: white;
  }
  
  .remove-btn:hover {
    background: #D70015;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .app-id {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .paths, .components {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .paths ul, .components ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
  }
  
  .paths li, .components li {
    margin-bottom: 0.25rem;
  }
  
  .paths code, .components code {
    background: #f1f3f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 0.8rem;
  }
  
  .comment {
    color: #666;
    font-style: italic;
    margin-left: 0.5rem;
  }
  
  .editor {
    border-top: 1px solid #ddd;
    background: #fafafa;
  }
  
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .empty-state p {
    margin-bottom: 1rem;
  }
</style> 