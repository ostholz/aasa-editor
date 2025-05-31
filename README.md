# 🍎 AASA Editor

A modern, web-based editor for Apple App Site Association (AASA) files that enables easy configuration of Universal Links for iOS apps.

![AASA Editor Screenshot](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🌐 Multi-Language Support
- **English** 🇺🇸
- **Chinese (Simplified)** 🇨🇳 
- **German** 🇩🇪
- Automatic browser language detection
- Persistent language preferences

### 📁 Multiple Loading Options
- **URL Loading**: Load AASA files directly from web URLs
- **CORS Proxy**: Built-in proxy support for cross-origin requests
- **File Upload**: Upload local AASA files or JSON files
- **Example Templates**: Pre-configured sample AASA files

### ✏️ Visual Editing Interface
- **App Details Management**: Add, edit, and remove app configurations
- **Path Configuration**: Visual editor for URL path patterns
- **Advanced Components**: Support for complex URL matching rules
- **Real-time Validation**: Instant feedback on configuration errors
- **Export Functionality**: Download edited AASA files

### 🎨 Modern UI/UX
- Clean, Apple-inspired design
- Responsive layout for all devices
- Dark/light theme support
- Intuitive drag-and-drop interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aasa-editor.git
   cd aasa-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📖 How to Use

### 1. Loading AASA Files

#### From URL
1. Enter the URL of your AASA file in the input field
2. Common locations:
   - `https://yourdomain.com/.well-known/apple-app-site-association`
   - `https://yourdomain.com/apple-app-site-association`
3. Enable "Use CORS proxy" if you encounter network errors
4. Click "Load" to fetch and parse the file

#### From Local File
1. Click "📁 Upload AASA File"
2. Select your local `apple-app-site-association` or JSON file
3. The file will be automatically validated and loaded

#### Using Examples
1. Click "🚀 Load Example AASA" to start with a sample configuration
2. Modify the example to match your app's requirements

### 2. Editing App Details

#### Adding New App Details
1. Click "+ Add App Detail" to create a new app configuration
2. Fill in the required App ID in format `TEAMID.BUNDLEID`
3. Configure paths and components as needed

#### App ID Configuration
- **Format**: `TEAMID.BUNDLEID`
- **Example**: `9JA89QQLNQ.com.example.myapp`
- **Team ID**: Your Apple Developer Team ID
- **Bundle ID**: Your app's bundle identifier

#### Path Configuration
Paths specify which URLs should open your app:

- **`*`** - Matches all paths
- **`/products/*`** - Matches any URL starting with `/products/`
- **`NOT /admin/*`** - Excludes URLs starting with `/admin/`
- **`/user/*/profile`** - Matches URLs like `/user/123/profile`

#### Advanced Components
For more granular control over URL matching:

- **Path Pattern**: Specific URL pattern to match
- **Comment**: Description of the rule (optional)
- **Exclude**: Whether to exclude this pattern
- **Case Sensitive**: Enable case-sensitive matching
- **Percent Encoded**: Handle percent-encoded URLs

### 3. Validation and Error Handling

The editor provides real-time validation:

- ✅ **Valid configurations** are highlighted in green
- ❌ **Invalid configurations** show error messages
- 💡 **Helpful tips** guide you through common issues

### 4. Exporting Your Configuration

1. Click "Export AASA" to download your configuration
2. The file will be named `apple-app-site-association`
3. Upload this file to your web server at:
   - `/.well-known/apple-app-site-association`
   - `/apple-app-site-association`

## 🔧 Technical Details

### AASA File Structure

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.BUNDLEID",
        "paths": ["*"],
        "components": [
          {
            "/": "/products/*",
            "comment": "Matches product pages"
          }
        ]
      }
    ]
  }
}
```

### Server Requirements

Your AASA file must be served with:
- **Content-Type**: `application/json`
- **HTTPS**: Required for production
- **No redirects**: Direct access to the file
- **Accessible**: No authentication required

### CORS Considerations

If loading from a different domain:
1. Enable "Use CORS proxy" option
2. Or configure your server to allow cross-origin requests:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET
   ```

## 🛠️ Development

### Project Structure

```
src/
├── lib/
│   ├── components/          # Svelte components
│   │   ├── URLInput.svelte
│   │   ├── AASAViewer.svelte
│   │   ├── AppDetailEditor.svelte
│   │   └── LanguageSelector.svelte
│   ├── i18n/               # Internationalization
│   │   ├── index.ts
│   │   ├── translations.ts
│   │   └── translate.ts
│   ├── types.ts            # TypeScript definitions
│   └── aasa-utils.ts       # Utility functions
├── routes/
│   └── +page.svelte        # Main application page
└── app.html                # HTML template
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking
- `npm run check:watch` - Watch mode type checking

### Adding New Languages

1. Add language code to `src/lib/i18n/index.ts`:
   ```typescript
   export type Language = 'en' | 'zh' | 'de' | 'fr'; // Add 'fr'
   ```

2. Add translations to `src/lib/i18n/translations.ts`:
   ```typescript
   fr: {
     title: 'Éditeur AASA',
     // ... other translations
   }
   ```

3. Update language selector in `src/lib/components/LanguageSelector.svelte`

## 🔍 Troubleshooting

### Common Issues

#### "Failed to load AASA file: NetworkError"
- **Solution**: Enable "Use CORS proxy" option
- **Alternative**: Download the file and use "Upload AASA File"

#### "Invalid AASA file: Missing applinks section"
- **Cause**: File is not a valid AASA format
- **Solution**: Ensure your file follows the correct JSON structure

#### "App ID must be in format TEAMID.BUNDLEID"
- **Cause**: Invalid App ID format
- **Solution**: Use your Apple Developer Team ID and app Bundle ID

### Getting Help

1. Check the troubleshooting tips in the error messages
2. Verify your AASA file structure matches Apple's requirements
3. Test your configuration with Apple's validation tools

## 📚 Resources

- [Apple Developer Documentation - Supporting Associated Domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)
- [Universal Links Guide](https://developer.apple.com/ios/universal-links/)
- [AASA File Validation](https://search.developer.apple.com/appsearch-validation-tool/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with modern CSS and Apple Design Guidelines
- Icons from [SF Symbols](https://developer.apple.com/sf-symbols/)
- CORS proxy provided by [allorigins.win](https://allorigins.win/)

---

**Made with ❤️ for iOS developers who want to easily configure Universal Links**
