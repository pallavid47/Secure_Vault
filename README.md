# 🔐 SecureVault - Advanced Password Manager

<div align="center">

![SecureVault](https://img.shields.io/badge/SecureVault-v1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A modern, secure password manager with biometric authentication and encrypted file storage**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [Technology Stack](#-technology-stack)
- [Security Features](#-security-features)
- [Browser Compatibility](#-browser-compatibility)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**SecureVault** is a client-side password manager that prioritizes your privacy and security. With advanced biometric face recognition and military-grade encryption, your sensitive data never leaves your device. Store passwords, credentials, and important documents all in one secure location.

### Why SecureVault?

- 🔒 **100% Client-Side** - All data stored locally in your browser
- 🎭 **Biometric Security** - Face recognition authentication
- 🔐 **Military-Grade Encryption** - AES-256 encryption with CryptoJS
- 📁 **File Storage** - Secure storage for documents and images
- 🌐 **No Server Required** - Works completely offline
- 💻 **Cross-Platform** - Works on any modern browser

---

## ✨ Features

### 🔐 Dual Authentication System
- **Face Recognition** - Webcam-based biometric authentication
- **ID Authentication** - Fallback password-based authentication
- **First-Time Setup** - Easy face registration wizard

### 🔑 Password Management
- **Secure Storage** - Store unlimited passwords with encryption
- **Password Generator** - Generate strong, random passwords
- **Categorization** - Organize by Website or App
- **Master Key Encryption** - Each entry encrypted with your master key
- **Copy to Clipboard** - One-click password copying
- **Delete Protection** - Failed attempt tracking prevents brute force

### 📁 File & Document Storage
- **Encrypted Files** - Store sensitive documents securely
- **Multiple Formats** - Support for images, PDFs, and documents
- **Drag & Drop** - Easy file upload interface
- **Preview Support** - View stored files directly
- **Storage Tracking** - Monitor your storage usage
- **File Management** - Download or delete files anytime

### 🎨 User Experience
- **Modern UI** - Clean, intuitive interface
- **Dark Theme** - Easy on the eyes
- **Responsive Design** - Works on desktop and mobile
- **Tab Interface** - Switch between passwords and files
- **Progress Indicators** - Visual feedback for all operations
- **Smooth Animations** - Polished user experience

---

## 🎬 Demo

### Live Demo
Simply open `index.html` in any modern web browser to start using SecureVault!

### Quick Start Steps:
1. **First Time**: Register your face using the webcam
2. **Login**: Use face recognition or ID authentication
3. **Add Password**: Enter website/app credentials with master key
4. **Upload Files**: Drag and drop documents to encrypt and store
5. **Access Anytime**: Your data is always available offline

---

## 📸 Screenshots

```
┌─────────────────────────────────────┐
│  🔐 Biometric Authentication        │
├─────────────────────────────────────┤
│  • Face Registration Wizard         │
│  • Real-time Camera Preview         │
│  • Progress Tracking                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🔑 Password Manager                │
├─────────────────────────────────────┤
│  • Add/Edit/Delete Passwords        │
│  • Password Generator               │
│  • Encrypted Storage                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📁 File Storage                    │
├─────────────────────────────────────┤
│  • Drag & Drop Upload               │
│  • Multiple File Formats            │
│  • Preview & Download               │
└─────────────────────────────────────┘
```

---

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam (for face recognition feature)
- Local web server (optional, for testing)

### Option 1: Direct Usage
```bash
# Clone the repository
git clone https://github.com/pallavid47/Secure_Vault.git

# Navigate to directory
cd Secure_Vault

# Open in browser
# Simply double-click index.html or use a local server
```

### Option 2: Using Python HTTP Server
```bash
# Navigate to project directory
cd Secure_Vault

# Start server (Python 3)
python -m http.server 8000

# Open browser
# Navigate to http://localhost:8000
```

### Option 3: Using Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd Secure_Vault

# Start server
http-server -p 8000

# Open browser
# Navigate to http://localhost:8000
```

---

## 📖 Usage

### Initial Setup

1. **First Launch**
   - Open the application in your browser
   - You'll see the authentication modal

2. **Register Your Face**
   - Click "Register Your Face"
   - Allow camera access when prompted
   - Position your face in the circle
   - Click "Start Registration"
   - Wait for the scanning process to complete

3. **Alternative: ID Authentication**
   - Click "Use ID Authentication"
   - Enter the default ID: `tithi`
   - Click "Verify ID"

### Managing Passwords

1. **Add New Password**
   ```
   - Select Type (Website/App)
   - Enter Name (e.g., facebook.com)
   - Enter Username/Email
   - Enter Password (or click Generate)
   - Enter Master Key for encryption
   - Click "Save Password"
   ```

2. **View Passwords**
   - All saved passwords appear in the table
   - Click "Show" to reveal password (requires master key)
   - Click "Copy" to copy to clipboard

3. **Delete Password**
   - Click "Delete" on any entry
   - Confirm deletion

### Managing Files

1. **Upload Files**
   ```
   - Click "📁 Upload New Files"
   - Drag files or click "Browse Files"
   - Select files (max 10MB each)
   - Click "Upload Files"
   ```

2. **Supported Formats**
   - Images: JPG, PNG, GIF, etc.
   - Documents: PDF, DOC, DOCX, TXT

3. **File Operations**
   - Click file to preview
   - Click "Download" to save locally
   - Click "Delete" to remove

### Security Best Practices

- ✅ Use a strong master key
- ✅ Don't share your master key
- ✅ Enable face recognition for added security
- ✅ Regularly backup your data
- ✅ Clear browser data carefully (will delete all passwords)
- ✅ Use generated passwords for maximum security

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (ES6+)** - Core functionality and logic

### Libraries & APIs
- **CryptoJS 4.1.1** - AES-256 encryption/decryption
- **MediaDevices API** - Webcam access for biometric auth
- **LocalStorage API** - Client-side data persistence
- **FileReader API** - File handling and Base64 encoding
- **Canvas API** - Image processing for face recognition

### Design & UI
- **Google Fonts (Poppins)** - Modern typography
- **CSS Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach
- **Custom Components** - Modal dialogs, tabs, cards

---

## 🔒 Security Features

### Encryption
- **Algorithm**: AES-256 (Advanced Encryption Standard)
- **Library**: CryptoJS - Industry-standard encryption
- **Master Key**: User-defined encryption key for each password
- **Unique Encryption**: Each password encrypted separately

### Biometric Authentication
- **Face Recognition**: Webcam-based biometric verification
- **Face Signature**: SHA-256 hash for face data
- **Local Storage**: Face data never sent to servers
- **Fallback Auth**: ID-based authentication option

### Data Protection
- **Client-Side Only**: No data transmitted to external servers
- **Browser Storage**: All data in browser's LocalStorage
- **Failed Attempts Tracking**: Prevents brute force attacks
- **Secure Logout**: Clears authentication state

### Privacy
- ✅ No cookies or tracking
- ✅ No external API calls (except CDN for CryptoJS)
- ✅ No user data collection
- ✅ Complete offline functionality
- ✅ Open source - audit the code yourself

### Important Security Notes

⚠️ **Limitations**
- Data stored in browser LocalStorage (not encrypted at rest)
- Clearing browser data will DELETE all passwords
- Face recognition is simulated (not true biometric verification)
- Suitable for personal use, not enterprise environments

🛡️ **Recommendations**
- Regular backups of important passwords
- Strong master keys (12+ characters)
- Keep browser updated
- Use in private browsing carefully (data may not persist)

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | Features Supported |
|---------|----------------|-------------------|
| Chrome  | 87+            | ✅ All Features   |
| Firefox | 85+            | ✅ All Features   |
| Edge    | 87+            | ✅ All Features   |
| Safari  | 14+            | ✅ All Features   |
| Opera   | 73+            | ✅ All Features   |

**Requirements:**
- JavaScript enabled
- LocalStorage enabled
- Camera access (for face recognition)
- Modern CSS support

---

## 📁 Project Structure

```
Secure_Vault/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Application logic and functionality
├── README.md           # This file
│
├── .git/              # Git repository data
└── .vscode/           # VS Code workspace settings
```

### Code Organization

**index.html** (244 lines)
- Biometric authentication modal
- File upload interface
- Password management form
- Files & documents tab
- Responsive layout

**style.css** (688 lines)
- Modern dark theme
- Modal and dialog styles
- Form and input styling
- Responsive grid layouts
- Animations and transitions
- File upload interface

**script.js** (882 lines)
- Authentication system
- Encryption/decryption logic
- Password management functions
- File storage operations
- Camera and face recognition
- LocalStorage management
- Event handlers and UI updates

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **Report Bugs** 🐛
   - Use the issue tracker
   - Include browser and version
   - Provide steps to reproduce

2. **Suggest Features** 💡
   - Open a feature request
   - Explain the use case
   - Discuss implementation ideas

3. **Submit Pull Requests** 🔧
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Test thoroughly
   - Submit PR with clear description

### Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/Secure_Vault.git
cd Secure_Vault

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
# ...

# Commit and push
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Coding Standards
- Clean, readable code
- Comments for complex logic
- Consistent naming conventions
- Test in multiple browsers
- Follow existing code style

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2026 SecureVault

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

### Project Links
- **GitHub Repository**: [https://github.com/pallavid47/Secure_Vault](https://github.com/pallavid47/Secure_Vault)
- **Issue Tracker**: [https://github.com/pallavid47/Secure_Vault/issues](https://github.com/pallavid47/Secure_Vault/issues)
- **Discussions**: [https://github.com/pallavid47/Secure_Vault/discussions](https://github.com/pallavid47/Secure_Vault/discussions)

### Support
- 💬 Open an issue for bugs
- 💡 Start a discussion for questions
- ⭐ Star the repo if you find it useful!

---

## 🙏 Acknowledgments

- **CryptoJS** - For providing robust encryption library
- **Google Fonts** - For the beautiful Poppins font
- **MediaDevices API** - For enabling webcam functionality
- **Open Source Community** - For inspiration and support

---

## 📊 Project Stats

- **Language**: JavaScript (ES6+)
- **Lines of Code**: ~1800+
- **Files**: 3 main files
- **Features**: 15+ core features
- **Security**: AES-256 encryption
- **Status**: Active Development

---

## 🚦 Roadmap

### Planned Features
- [ ] Export/Import functionality
- [ ] Password strength meter
- [ ] Multi-device sync (optional)
- [ ] Browser extension
- [ ] Password categories/folders
- [ ] Search and filter
- [ ] Dark/Light theme toggle
- [ ] Two-factor authentication
- [ ] Encrypted cloud backup option
- [ ] Password breach detection

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for privacy and security**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Privacy First](https://img.shields.io/badge/Privacy-First-blue?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open-Source-green?style=for-the-badge)

</div>