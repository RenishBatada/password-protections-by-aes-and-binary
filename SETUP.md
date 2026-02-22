# AES Encryption/Decryption Tool - Setup Guide

## 🌐 Repository

**GitHub Repository:** https://github.com/RenishBatada/password-protections-by-aes-and-binary.git

You can clone the repository using:
```bash
git clone https://github.com/RenishBatada/password-protections-by-aes-and-binary.git
cd password-protections-by-aes-and-binary
```

---

## 🚀 Quick Start

### Automatic Method (Recommended)
```bash
./start.sh
```

This is the easiest way to start the application. The script handles everything automatically!

---

## 📋 Prerequisites

- **Python 3** (recommended) or Python 2
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

---

## 🛠️ Installation & Setup

### 1. Clone/Download the Project
```bash
# If using git
git clone https://github.com/RenishBatada/password-protections-by-aes-and-binary.git
cd password-protections-by-aes-and-binary

# Or download and extract the ZIP file
```

### 2. Set Permissions
```bash
chmod +x start.sh
```

### 3. Configure Port (Optional)
Create/edit `.env` file to set custom port:
```bash
echo "PORT=8001" > .env
```

---

## 🌐 Running the Application

### Method 1: Automatic (start.sh) ✨
```bash
./start.sh
```

**Features:**
- ✅ Auto-detects Python version
- ✅ Reads port from `.env` file
- ✅ Changes to correct directory automatically
- ✅ Provides helpful error messages
- ✅ Works from any location
- ✅ Network accessible (0.0.0.0)

### Method 2: Manual with Python 3
```bash
cd /path/to/password-protections-by-aes-and-binary
python3 -m http.server 8001 --bind 0.0.0.0
```

### Method 3: Manual with Python 2
```bash
cd /path/to/password-protections-by-aes-and-binary
python -m http.server 8001 --bind 0.0.0.0
```

### Method 4: Using Node.js (if you have Node.js)
```bash
# Install http-server globally
npm install -g http-server

# Run the server
cd /path/to/password-protections-by-aes-and-binary
http-server -p 8001 -a 0.0.0.0
```

### Method 5: Using PHP (if you have PHP)
```bash
cd /path/to/password-protections-by-aes-and-binary
php -S 0.0.0.0:8001
```

---

## 🌍 Accessing the Application

Once the server is running:

### Local Access
```
http://localhost:8001
```

### Network Access (from other devices)
```
http://YOUR_IP_ADDRESS:8001
```

**Find your IP address:**
- **Linux**: `ip addr` or `hostname -I`
- **macOS**: `ifconfig` or `ipconfig getifaddr en0`
- **Windows**: `ipconfig`

---

## ⚙️ Configuration

### Port Configuration
1. **Using .env file** (recommended):
   ```bash
   echo "PORT=3000" > .env
   ./start.sh
   ```

2. **Default port**: 8001 (if no .env file)

### Server Options
- **Bind address**: 0.0.0.0 (accessible from network)
- **Directory**: Automatically detected by start.sh
- **Python version**: Auto-detected (Python 3 preferred)

---

## 🔧 Troubleshooting

### Permission Denied
```bash
chmod +x /path/to/start.sh
```

### Python Not Found
```bash
# Ubuntu/Debian
sudo apt-get install python3

# CentOS/RHEL
sudo yum install python3

# macOS
brew install python3

# Windows
# Download from https://python.org
```

### Port Already in Use
```bash
# Change port in .env file
echo "PORT=8080" > .env

# Or kill the process using the port
sudo lsof -ti:8001 | xargs kill -9
```

### Can't Access from Other Devices
1. **Check firewall settings**
2. **Ensure server binds to 0.0.0.0**
3. **Verify correct IP address**
4. **Check if devices are on same network**

---

## 📱 Mobile Access

1. Start the server with `./start.sh`
2. Find your computer's IP address
3. On mobile device, open: `http://YOUR_IP:8001`
4. Works on same WiFi network

---

## 🚀 Advanced Options

### Custom Directory
```bash
# Run from any location
/path/to/start.sh
```

### Background Mode
```bash
nohup ./start.sh > server.log 2>&1 &
```

### Custom Python Path
```bash
/usr/bin/python3 -m http.server 8001 --bind 0.0.0.0
```

---

## 🛡️ Security Notes

- **Local use only**: This is designed for personal password management
- **Network access**: When using 0.0.0.0, anyone on your network can access
- **HTTPS**: Not included (HTTP only for local development)
- **Data storage**: All encryption happens in browser, no server storage

---

## 📞 Support

If you encounter issues:

1. **Check the error messages** in the terminal
2. **Verify Python installation**
3. **Ensure correct permissions**
4. **Check port availability**
5. **Review this setup guide**

---

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `./start.sh` | Start server automatically |
| `chmod +x start.sh` | Fix permissions |
| `echo "PORT=3000" > .env` | Set custom port |
| `python3 -m http.server 8001` | Manual start with Python 3 |
| `Ctrl+C` | Stop server |

---

**🎉 Enjoy your AES Encryption/Decryption Tool!**
