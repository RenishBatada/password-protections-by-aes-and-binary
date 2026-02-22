#!/bin/bash

# AES Encryption/Decryption Tool - Server Start Script
# This script starts a local HTTP server to run the web application

# Check if running with sh instead of bash
if [ -z "$BASH_VERSION" ]; then
    # Get the script directory using sh-compatible method
    SCRIPT_DIR="$(cd "$(dirname "$0")" 2>/dev/null && pwd)"
    if [ -z "$SCRIPT_DIR" ]; then
        SCRIPT_DIR="$(pwd)"
    fi
    SCRIPT_FULL_PATH="$SCRIPT_DIR/start.sh"
    
    echo "❌ Error: This script must be run with bash, not sh"
    echo "📁 Script location: $SCRIPT_FULL_PATH"
    echo ""
    echo "Please run as:"
    echo "  ./start.sh"
    echo ""
    echo "Or if you need to fix permissions first:"
    echo "  chmod +x \"$SCRIPT_FULL_PATH\""
    echo "  ./start.sh"
    echo ""
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
SCRIPT_FULL_PATH="$SCRIPT_DIR/start.sh"

# Change to the script directory
cd "$SCRIPT_DIR"

# Check if script is run correctly
if [[ "${BASH_SOURCE[0]}" != "${0}" ]]; then
    echo "⚠️  Warning: Script should be run directly, not sourced"
    echo "Please run as: ./start.sh"
    echo ""
fi

# Check if script has execute permissions
if [[ ! -x "$SCRIPT_FULL_PATH" ]]; then
    echo "❌ Error: Script does not have execute permissions"
    echo "📁 Script location: $SCRIPT_FULL_PATH"
    echo ""
    echo "To fix permissions, run:"
    echo "chmod +x \"$SCRIPT_FULL_PATH\""
    echo ""
    echo "Then run again: ./start.sh"
    exit 1
fi

echo "=================================="
echo "AES Encryption/Decryption Tool"
echo "=================================="
echo "Starting local server..."
echo "📁 Working directory: $SCRIPT_DIR"
echo ""

# Check if .env file exists and read port
DEFAULT_PORT=8001
SERVER_PORT=$DEFAULT_PORT

if [[ -f "$ENV_FILE" ]]; then
    # Read port from .env file
    if grep -q "^PORT=" "$ENV_FILE"; then
        SERVER_PORT=$(grep "^PORT=" "$ENV_FILE" | cut -d'=' -f2)
        echo "🔧 Using port from .env file: $SERVER_PORT"
    else
        echo "⚠️  .env file found but no PORT specified, using default: $DEFAULT_PORT"
        echo "💡 To set custom port, add 'PORT=8001' to .env file"
    fi
else
    echo "⚠️  .env file not found, using default port: $DEFAULT_PORT"
    echo "💡 To set custom port, create .env file with 'PORT=8001'"
fi

echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3 to start server..."
    echo "🌐 Server will be available at:"
    echo "- Local: https://localhost:$SERVER_PORT"
    echo "- Network: https://0.0.0.0:$SERVER_PORT"
    echo ""
    echo "📱 Other devices on the same network can access using your IP address"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server "$SERVER_PORT" --bind 0.0.0.0
elif command -v python &> /dev/null; then
    echo "🐍 Using Python to start server..."
    echo "🌐 Server will be available at:"
    echo "- Local: https://localhost:$SERVER_PORT"
    echo "- Network: https://0.0.0.0:$SERVER_PORT"
    echo ""
    echo "📱 Other devices on the same network can access using your IP address"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python -m http.server "$SERVER_PORT" --bind 0.0.0.0
else
    echo "❌ Error: Python is not installed on this system."
    echo "Please install Python 3 or Python 2 to run the server."
    echo ""
    echo "📦 Installation instructions:"
    echo "- Ubuntu/Debian: sudo apt-get install python3"
    echo "- CentOS/RHEL: sudo yum install python3"
    echo "- macOS: brew install python3"
    echo "- Windows: Download from https://python.org"
    exit 1
fi
