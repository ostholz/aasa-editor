import type { Language } from './index.js';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  
  // URL Input
  loadAASAFile: string;
  fromURL: string;
  fromFile: string;
  example: string;
  urlPlaceholder: string;
  loadButton: string;
  loadingButton: string;
  useCORSProxy: string;
  corsProxyHelp: string;
  uploadAASAFile: string;
  uploadHelp: string;
  loadExampleAASA: string;
  exampleHelp: string;
  commonURLs: string;
  
  // Validation and Errors
  enterURL: string;
  enterValidURL: string;
  selectAASAFile: string;
  invalidAASAFile: string;
  failedToReadFile: string;
  errorLoadingAASA: string;
  corsErrorDetected: string;
  
  // AASA Viewer
  aasaConfiguration: string;
  addAppDetail: string;
  exportAASA: string;
  apps: string;
  totalPaths: string;
  totalComponents: string;
  appDetail: string;
  edit: string;
  close: string;
  remove: string;
  appID: string;
  notSet: string;
  paths: string;
  components: string;
  noAppDetails: string;
  addFirstAppDetail: string;
  
  // App Detail Editor
  appIDRequired: string;
  appIDFormat: string;
  appIDHelp: string;
  addPath: string;
  addComponent: string;
  noPathsConfigured: string;
  pathsHelp: string;
  pathExamples: string;
  noComponentsConfigured: string;
  componentsHelp: string;
  pathPattern: string;
  comment: string;
  commentOptional: string;
  exclude: string;
  caseSensitive: string;
  percentEncoded: string;
  
  // Troubleshooting
  troubleshootingTips: string;
  ensureURLAccessible: string;
  tryCORSProxy: string;
  checkCORS: string;
  verifyFileLocation: string;
  checkContentType: string;
  useFileUpload: string;
  
  // Footer
  learnMore: string;
  
  // Language Selector
  language: string;
  english: string;
  chinese: string;
  german: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: '🍎 AASA Editor',
    subtitle: 'Apple App Site Association File Editor',
    
    // URL Input
    loadAASAFile: 'Load AASA File',
    fromURL: 'From URL',
    fromFile: 'From File',
    example: 'Example',
    urlPlaceholder: 'https://example.com/.well-known/apple-app-site-association',
    loadButton: 'Load',
    loadingButton: 'Loading...',
    useCORSProxy: 'Use CORS proxy (enable if you get network errors)',
    corsProxyHelp: 'Enable this option if you encounter CORS errors',
    uploadAASAFile: '📁 Upload AASA File',
    uploadHelp: 'Select a local apple-app-site-association or JSON file',
    loadExampleAASA: '🚀 Load Example AASA',
    exampleHelp: 'Load a sample AASA configuration to get started',
    commonURLs: 'Common AASA URLs:',
    
    // Validation and Errors
    enterURL: 'Please enter a URL',
    enterValidURL: 'Please enter a valid URL',
    selectAASAFile: 'Please select an AASA file or JSON file',
    invalidAASAFile: 'Invalid AASA file',
    failedToReadFile: 'Failed to read file',
    errorLoadingAASA: 'Error Loading AASA File',
    corsErrorDetected: 'CORS error detected. Try enabling proxy mode or ensure the server allows cross-origin requests.',
    
    // AASA Viewer
    aasaConfiguration: 'AASA Configuration',
    addAppDetail: '+ Add App Detail',
    exportAASA: 'Export AASA',
    apps: 'Apps:',
    totalPaths: 'Total Paths:',
    totalComponents: 'Total Components:',
    appDetail: 'App Detail',
    edit: 'Edit',
    close: 'Close',
    remove: 'Remove',
    appID: 'App ID:',
    notSet: 'Not set',
    paths: 'Paths',
    components: 'Components',
    noAppDetails: 'No app details configured.',
    addFirstAppDetail: 'Add First App Detail',
    
    // App Detail Editor
    appIDRequired: 'App ID',
    appIDFormat: 'App ID must be in format TEAMID.BUNDLEID',
    appIDHelp: 'Format: TEAMID.BUNDLEID where TEAMID is your Apple Developer Team ID',
    addPath: '+ Add Path',
    addComponent: '+ Add Component',
    noPathsConfigured: 'No paths configured. Add a path to specify which URLs should open your app.',
    pathsHelp: 'Examples: "*" (all paths), "/products/*", "NOT /admin/*"',
    pathExamples: 'Examples: "*" (all paths), "/products/*", "NOT /admin/*"',
    noComponentsConfigured: 'No components configured. Components provide more advanced URL matching.',
    componentsHelp: 'Components provide more granular control over URL matching than simple paths.',
    pathPattern: 'Path Pattern:',
    comment: 'Comment (optional):',
    commentOptional: 'Description of this rule',
    exclude: 'Exclude',
    caseSensitive: 'Case Sensitive',
    percentEncoded: 'Percent Encoded',
    
    // Troubleshooting
    troubleshootingTips: 'Troubleshooting Tips',
    ensureURLAccessible: 'Ensure the URL is accessible and returns a valid JSON file',
    tryCORSProxy: 'Try enabling the "Use CORS proxy" option if you get network errors',
    checkCORS: 'Check that CORS is properly configured on the server',
    verifyFileLocation: 'Verify the file is located at /.well-known/apple-app-site-association or /apple-app-site-association',
    checkContentType: 'Make sure the file has the correct Content-Type header (application/json)',
    useFileUpload: 'Alternatively, download the file and use the "Upload AASA File" option',
    
    // Footer
    learnMore: 'Learn more about',
    
    // Language Selector
    language: 'Language',
    english: 'English',
    chinese: '中文',
    german: 'Deutsch'
  },
  
  zh: {
    // Header
    title: '🍎 AASA 编辑器',
    subtitle: 'Apple App Site Association 文件编辑器',
    
    // URL Input
    loadAASAFile: '加载 AASA 文件',
    fromURL: '从 URL',
    fromFile: '从文件',
    example: '示例',
    urlPlaceholder: 'https://example.com/.well-known/apple-app-site-association',
    loadButton: '加载',
    loadingButton: '加载中...',
    useCORSProxy: '使用 CORS 代理（如果遇到网络错误请启用）',
    corsProxyHelp: '如果遇到 CORS 错误，请启用此选项',
    uploadAASAFile: '📁 上传 AASA 文件',
    uploadHelp: '选择本地的 apple-app-site-association 或 JSON 文件',
    loadExampleAASA: '🚀 加载示例 AASA',
    exampleHelp: '加载示例 AASA 配置以开始使用',
    commonURLs: '常用 AASA URL：',
    
    // Validation and Errors
    enterURL: '请输入 URL',
    enterValidURL: '请输入有效的 URL',
    selectAASAFile: '请选择 AASA 文件或 JSON 文件',
    invalidAASAFile: '无效的 AASA 文件',
    failedToReadFile: '读取文件失败',
    errorLoadingAASA: '加载 AASA 文件错误',
    corsErrorDetected: '检测到 CORS 错误。请尝试启用代理模式或确保服务器允许跨域请求。',
    
    // AASA Viewer
    aasaConfiguration: 'AASA 配置',
    addAppDetail: '+ 添加应用详情',
    exportAASA: '导出 AASA',
    apps: '应用：',
    totalPaths: '总路径数：',
    totalComponents: '总组件数：',
    appDetail: '应用详情',
    edit: '编辑',
    close: '关闭',
    remove: '删除',
    appID: '应用 ID：',
    notSet: '未设置',
    paths: '路径',
    components: '组件',
    noAppDetails: '未配置应用详情。',
    addFirstAppDetail: '添加第一个应用详情',
    
    // App Detail Editor
    appIDRequired: '应用 ID',
    appIDFormat: '应用 ID 必须采用 TEAMID.BUNDLEID 格式',
    appIDHelp: '格式：TEAMID.BUNDLEID，其中 TEAMID 是您的 Apple 开发者团队 ID',
    addPath: '+ 添加路径',
    addComponent: '+ 添加组件',
    noPathsConfigured: '未配置路径。添加路径以指定哪些 URL 应该打开您的应用。',
    pathsHelp: '示例："*"（所有路径）、"/products/*"、"NOT /admin/*"',
    pathExamples: '示例："*"（所有路径）、"/products/*"、"NOT /admin/*"',
    noComponentsConfigured: '未配置组件。组件提供更高级的 URL 匹配功能。',
    componentsHelp: '组件比简单路径提供更精细的 URL 匹配控制。',
    pathPattern: '路径模式：',
    comment: '注释（可选）：',
    commentOptional: '此规则的描述',
    exclude: '排除',
    caseSensitive: '区分大小写',
    percentEncoded: '百分号编码',
    
    // Troubleshooting
    troubleshootingTips: '故障排除提示',
    ensureURLAccessible: '确保 URL 可访问并返回有效的 JSON 文件',
    tryCORSProxy: '如果遇到网络错误，请尝试启用"使用 CORS 代理"选项',
    checkCORS: '检查服务器是否正确配置了 CORS',
    verifyFileLocation: '验证文件位于 /.well-known/apple-app-site-association 或 /apple-app-site-association',
    checkContentType: '确保文件具有正确的 Content-Type 头（application/json）',
    useFileUpload: '或者，下载文件并使用"上传 AASA 文件"选项',
    
    // Footer
    learnMore: '了解更多关于',
    
    // Language Selector
    language: '语言',
    english: 'English',
    chinese: '中文',
    german: 'Deutsch'
  },
  
  de: {
    // Header
    title: '🍎 AASA Editor',
    subtitle: 'Apple App Site Association Datei-Editor',
    
    // URL Input
    loadAASAFile: 'AASA-Datei laden',
    fromURL: 'Von URL',
    fromFile: 'Von Datei',
    example: 'Beispiel',
    urlPlaceholder: 'https://example.com/.well-known/apple-app-site-association',
    loadButton: 'Laden',
    loadingButton: 'Lädt...',
    useCORSProxy: 'CORS-Proxy verwenden (aktivieren bei Netzwerkfehlern)',
    corsProxyHelp: 'Aktivieren Sie diese Option bei CORS-Fehlern',
    uploadAASAFile: '📁 AASA-Datei hochladen',
    uploadHelp: 'Wählen Sie eine lokale apple-app-site-association oder JSON-Datei',
    loadExampleAASA: '🚀 Beispiel-AASA laden',
    exampleHelp: 'Laden Sie eine Beispiel-AASA-Konfiguration zum Einstieg',
    commonURLs: 'Häufige AASA-URLs:',
    
    // Validation and Errors
    enterURL: 'Bitte geben Sie eine URL ein',
    enterValidURL: 'Bitte geben Sie eine gültige URL ein',
    selectAASAFile: 'Bitte wählen Sie eine AASA-Datei oder JSON-Datei',
    invalidAASAFile: 'Ungültige AASA-Datei',
    failedToReadFile: 'Datei konnte nicht gelesen werden',
    errorLoadingAASA: 'Fehler beim Laden der AASA-Datei',
    corsErrorDetected: 'CORS-Fehler erkannt. Versuchen Sie den Proxy-Modus zu aktivieren oder stellen Sie sicher, dass der Server Cross-Origin-Anfragen erlaubt.',
    
    // AASA Viewer
    aasaConfiguration: 'AASA-Konfiguration',
    addAppDetail: '+ App-Detail hinzufügen',
    exportAASA: 'AASA exportieren',
    apps: 'Apps:',
    totalPaths: 'Gesamte Pfade:',
    totalComponents: 'Gesamte Komponenten:',
    appDetail: 'App-Detail',
    edit: 'Bearbeiten',
    close: 'Schließen',
    remove: 'Entfernen',
    appID: 'App-ID:',
    notSet: 'Nicht gesetzt',
    paths: 'Pfade',
    components: 'Komponenten',
    noAppDetails: 'Keine App-Details konfiguriert.',
    addFirstAppDetail: 'Erstes App-Detail hinzufügen',
    
    // App Detail Editor
    appIDRequired: 'App-ID',
    appIDFormat: 'App-ID muss im Format TEAMID.BUNDLEID sein',
    appIDHelp: 'Format: TEAMID.BUNDLEID, wobei TEAMID Ihre Apple Developer Team-ID ist',
    addPath: '+ Pfad hinzufügen',
    addComponent: '+ Komponente hinzufügen',
    noPathsConfigured: 'Keine Pfade konfiguriert. Fügen Sie einen Pfad hinzu, um anzugeben, welche URLs Ihre App öffnen sollen.',
    pathsHelp: 'Beispiele: "*" (alle Pfade), "/products/*", "NOT /admin/*"',
    pathExamples: 'Beispiele: "*" (alle Pfade), "/products/*", "NOT /admin/*"',
    noComponentsConfigured: 'Keine Komponenten konfiguriert. Komponenten bieten erweiterte URL-Zuordnung.',
    componentsHelp: 'Komponenten bieten eine feinere Kontrolle über URL-Zuordnung als einfache Pfade.',
    pathPattern: 'Pfad-Muster:',
    comment: 'Kommentar (optional):',
    commentOptional: 'Beschreibung dieser Regel',
    exclude: 'Ausschließen',
    caseSensitive: 'Groß-/Kleinschreibung beachten',
    percentEncoded: 'Prozent-kodiert',
    
    // Troubleshooting
    troubleshootingTips: 'Fehlerbehebungstipps',
    ensureURLAccessible: 'Stellen Sie sicher, dass die URL zugänglich ist und eine gültige JSON-Datei zurückgibt',
    tryCORSProxy: 'Versuchen Sie die Option "CORS-Proxy verwenden" bei Netzwerkfehlern',
    checkCORS: 'Überprüfen Sie, ob CORS auf dem Server richtig konfiguriert ist',
    verifyFileLocation: 'Überprüfen Sie, ob sich die Datei unter /.well-known/apple-app-site-association oder /apple-app-site-association befindet',
    checkContentType: 'Stellen Sie sicher, dass die Datei den korrekten Content-Type-Header hat (application/json)',
    useFileUpload: 'Alternativ laden Sie die Datei herunter und verwenden die Option "AASA-Datei hochladen"',
    
    // Footer
    learnMore: 'Erfahren Sie mehr über',
    
    // Language Selector
    language: 'Sprache',
    english: 'English',
    chinese: '中文',
    german: 'Deutsch'
  }
}; 