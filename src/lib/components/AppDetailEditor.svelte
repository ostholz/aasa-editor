<script lang="ts">
  import type { AppDetail } from '../types.js';
  import { validateAppDetail, createEmptyComponent } from '../aasa-utils.js';
  import { t } from '../i18n/translate.js';
  
  export let detail: AppDetail;
  
  let errors: any[] = [];
  
  $: {
    errors = validateAppDetail(detail);
  }
  
  function addPath() {
    if (!detail.paths) detail.paths = [];
    detail.paths = [...detail.paths, ''];
  }
  
  function removePath(index: number) {
    if (detail.paths) {
      detail.paths = detail.paths.filter((_, i) => i !== index);
    }
  }
  
  function addComponent() {
    if (!detail.components) detail.components = [];
    detail.components = [...detail.components, createEmptyComponent()];
  }
  
  function removeComponent(index: number) {
    if (detail.components) {
      detail.components = detail.components.filter((_, i) => i !== index);
    }
  }
  
  function getErrorForField(field: string): string | undefined {
    return errors.find(e => e.field === field)?.message;
  }
</script>

<div class="app-detail-editor">
  <div class="section">
    <label for="appId">
      {$t.appIDRequired} <span class="required">*</span>
      {#if getErrorForField('appID')}
        <span class="error-text">- {getErrorForField('appID')}</span>
      {/if}
    </label>
    <input
      id="appId"
      type="text"
      bind:value={detail.appID}
      placeholder="TEAMID.BUNDLEID (e.g., 9JA89QQLNQ.com.example.app)"
      class="input"
      class:error={getErrorForField('appID')}
    />
    <div class="help-text">
      {$t.appIDHelp}
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <h4>{$t.paths}</h4>
      <button type="button" on:click={addPath} class="add-btn-small">{$t.addPath}</button>
    </div>
    
    {#if detail.paths && detail.paths.length > 0}
      {#each detail.paths as path, index}
        <div class="path-item">
          <input
            type="text"
            bind:value={detail.paths[index]}
            placeholder="/path/* or NOT /excluded/*"
            class="input path-input"
          />
          <button
            type="button"
            on:click={() => removePath(index)}
            class="remove-btn-small"
          >
            ×
          </button>
        </div>
      {/each}
    {:else}
      <div class="empty-message">
        {$t.noPathsConfigured}
      </div>
    {/if}
    
    <div class="help-text">
      {$t.pathExamples}
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <h4>{$t.components} (Advanced)</h4>
      <button type="button" on:click={addComponent} class="add-btn-small">{$t.addComponent}</button>
    </div>
    
    {#if detail.components && detail.components.length > 0}
      {#each detail.components as component, index}
        <div class="component-item">
          <div class="component-fields">
            <div class="field">
              <label>{$t.pathPattern}</label>
              <input
                type="text"
                bind:value={component['/']}
                placeholder="/path/*"
                class="input"
              />
            </div>
            <div class="field">
              <label>{$t.comment}</label>
              <input
                type="text"
                bind:value={component.comment}
                placeholder={$t.commentOptional}
                class="input"
              />
            </div>
            <div class="checkboxes">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={component.exclude}
                />
                {$t.exclude}
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={component.caseSensitive}
                />
                {$t.caseSensitive}
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={component.percentEncoded}
                />
                {$t.percentEncoded}
              </label>
            </div>
          </div>
          <button
            type="button"
            on:click={() => removeComponent(index)}
            class="remove-btn-small"
          >
            ×
          </button>
        </div>
      {/each}
    {:else}
      <div class="empty-message">
        {$t.noComponentsConfigured}
      </div>
    {/if}
    
    <div class="help-text">
      {$t.componentsHelp}
    </div>
  </div>
</div>

<style>
  .app-detail-editor {
    padding: 1.5rem;
  }
  
  .section {
    margin-bottom: 2rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .section-header h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  .required {
    color: #FF3B30;
  }
  
  .error-text {
    color: #FF3B30;
    font-weight: normal;
    font-size: 0.8rem;
  }
  
  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    box-sizing: border-box;
  }
  
  .input:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
  
  .input.error {
    border-color: #FF3B30;
  }
  
  .help-text {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
  }
  
  .add-btn-small {
    padding: 0.25rem 0.75rem;
    background: #34C759;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .add-btn-small:hover {
    background: #28A745;
  }
  
  .path-item, .component-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .path-input {
    flex: 1;
  }
  
  .component-fields {
    flex: 1;
    display: grid;
    gap: 0.75rem;
  }
  
  .field label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  .checkboxes {
    display: flex;
    gap: 1rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    font-weight: normal;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: auto;
  }
  
  .remove-btn-small {
    padding: 0.25rem 0.5rem;
    background: #FF3B30;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    min-width: 2rem;
  }
  
  .remove-btn-small:hover {
    background: #D70015;
  }
  
  .empty-message {
    padding: 1rem;
    background: #f8f9fa;
    border: 1px dashed #ddd;
    border-radius: 4px;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }
</style> 