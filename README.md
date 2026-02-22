# 🔐 AES Encryption & Decryption Tool

> 🌟 **Securely encrypt and decrypt your sensitive data with AES-128 in binary format**

![License](https://img.shields.io/badge/license-Custom-blue?style=flat-square)
![Python](https://img.shields.io/badge/python-3%2B-blue?style=flat-square)
![HTML](https://img.shields.io/badge/html5-orange?style=flat-square)
![JavaScript](https://img.shields.io/badge/javascript-yellow?style=flat-square)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Setup](#️-setup)
- [📖 Usage](#-usage)
- [🔧 How It Works](#-how-it-works)
- [⚖️ License](#️-license)
- [📞 Support](#-support)

## 🎯 Overview

This project provides a **web-based tool** for encrypting and decrypting text using **AES-128 in CBC mode** with binary output. Perfect for personal password management! 🛡️

### 🎯 Why This Tool?

- **🔒 Secure**: AES-128 encryption with military-grade security
- **📱 Portable**: Single HTML file - works anywhere
- **👀 Privacy**: Everything happens in your browser
- **💾 Storage**: Store encrypted passwords in notes (Google Keep, etc.)
- **🔄 Two-way**: Encrypt and decrypt anytime with the right key

## ✨ Features

### 🛡️ **Security Features**
- 🔐 **AES-128 Encryption** - Military-grade security
- 🔑 **16-character keys** - Optimal security level
- 🌐 **Binary output** - Store anywhere safely
- ✅ **Key validation** - Prevents errors

### 🎨 **User Experience**
- 📱 **Responsive design** - Works on all devices
- 🎯 **Real-time validation** - Instant feedback
- 📋 **Copy/Paste support** - Easy data transfer
- 📁 **File upload/download** - Bulk operations
- 🔄 **Collapsible sections** - Clean interface

### 🚀 **Performance**
- ⚡ **Fast encryption** - Instant results
- 💻 **Client-side only** - No server needed
- 🌍 **Network accessible** - Use from any device

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/RenishBatada/password-protections-by-aes-and-binary.git
cd password-protections-by-aes-and-binary

# 2. Make executable (Linux/macOS)
chmod +x start.sh

# 3. Start the server
./start.sh

# 4. Open browser
# http://localhost:8001
```

## ⚙️ Setup

📋 **Setup Instructions**: See [SETUP.md](SETUP.md) for complete setup guide

### 🎯 Quick Options
- **🚀 Automatic**: `./start.sh` (recommended)
- **🐍 Python 3**: `python3 -m http.server 8001 --bind 0.0.0.0`
- **🔧 Port Config**: Edit `.env` file (default: 8001)

<details>
<summary>🔧 View All Setup Methods</summary>

### Available Setup Methods:
1. **🚀 Automatic**: `./start.sh` (recommended)
2. **🐍 Python 3**: `python3 -m http.server 8001 --bind 0.0.0.0`
3. **🐍 Python 2**: `python -m http.server 8001 --bind 0.0.0.0`
4. **📦 Node.js**: `npx http-server -p 8001 -a 0.0.0.0`
5. **🐘 PHP**: `php -S 0.0.0.0:8001`

For detailed instructions, troubleshooting, and advanced options, see [SETUP.md](SETUP.md).

</details>

## 📖 Usage

### 🔤 **Encryption Process**
1. 📝 Enter your plain text
2. 🔑 Set a 16-character secret key
3. ⚙️ (Optional) Configure advanced settings
4. 🔒 Click **Encrypt**
5. 📋 Copy the binary output

### 🔓 **Decryption Process**
1. 📋 Paste binary encrypted text
2. 🔑 Enter the same secret key
3. ⚙️ (Optional) Configure same settings
4. 🔓 Click **Decrypt**
5. 👀 Get your original text back

### 💡 **Pro Tips**
- 🎯 **Use strong keys**: Mix letters, numbers, symbols
- 📝 **Remember your keys**: Without them, data is lost forever
- 🔄 **Same settings**: Use identical settings for encrypt/decrypt
- 📱 **Mobile friendly**: Works on phones/tablets

## 🔧 How It Works

### 🔄 **Encryption Flow**
```
Plain Text → AES-128 Encryption → Binary Output
```

### 🔓 **Decryption Flow**
```
Binary Input → Plain Text → AES-128 Decryption 
```

### 🛡️ **Security Details**
- **🔐 Algorithm**: AES-128 (Advanced Encryption Standard)
- **🔀 Mode**: CBC (Cipher Block Chaining)
- **📦 Padding**: PKCS7
- **🔑 Key Size**: 128 bits (16 characters)
- **🌐 Output**: Binary format (1s and 0s)

## ⚖️ License

📄 **License**: See [LICENSE](LICENSE) for complete terms

<details>
<summary>⚖️ View License Summary</summary>

### 👤 **Owner**: Renishali (Renish) Batada

### ✅ **What You CAN Do**
- 👀 View and read the source code
- 📚 Learn from the code
- 🎓 Use for educational purposes
- 👤 Personal, non-commercial use

### ❌ **What You CANNOT Do**
- 💰 Commercial use (selling, SaaS, business operations)
- 🔧 Modify or create derivative works
- 📦 Use in commercial products

### 📧 **Permission Required**
For commercial use or modifications, contact:
- **📧 Email**: batada.renish@gmail.com
- **📝 Subject**: "AES Tool License Request - [Your Purpose]"

For complete legal terms and conditions, see [LICENSE](LICENSE).

</details>

## 📞 Support

### 🆘 **Need Help?**
- 📖 Check [SETUP.md](SETUP.md) for setup issues
- 📧 Email: batada.renish@gmail.com
- 🐛 Report issues on GitHub

### 🎉 **Enjoy the Tool!**
> 🔐 **Secure your passwords with AES encryption!**

---

<div align="center">

**🌟 Made with ❤️ by Renishali (Renish) Batada**

[🔗 GitHub Repository](https://github.com/RenishBatada/password-protections-by-aes-and-binary.git) • 
[📧 Contact](mailto:batada.renish@gmail.com) • 
[⚖️ License](LICENSE)

</div>

