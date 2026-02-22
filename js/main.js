/**
 * Main Application Logic for AES Encryption/Decryption
 */

// DOM Elements
let elements = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializeElements();
    setupEventListeners();
    
    // Initialize collapsible sections
    initCollapsibles();
});

// Initialize DOM element references
function initializeElements() {
    // Encryption elements
    elements.plainText = document.getElementById("plainText");
    elements.cipherMode = document.getElementById("cipherMode");
    elements.padding = document.getElementById("padding");
    elements.iv = document.getElementById("iv");
    elements.keySize = document.getElementById("keySize");
    elements.secretKey = document.getElementById("secretKey");
    elements.secretKeyCounter = document.getElementById("secretKeyCounter");
    elements.encryptButton = document.getElementById("encryptButton");
    elements.encryptedOutput = document.getElementById("encryptedOutput");
    elements.encryptStatus = document.getElementById("encryptStatus");
    
    // Decryption elements
    elements.encryptedText = document.getElementById("encryptedText");
    elements.decipherMode = document.getElementById("decipherMode");
    elements.decPadding = document.getElementById("decPadding");
    elements.decIv = document.getElementById("decIv");
    elements.decKeySize = document.getElementById("decKeySize");
    elements.decSecretKey = document.getElementById("decSecretKey");
    elements.decSecretKeyCounter = document.getElementById("decSecretKeyCounter");
    elements.decryptButton = document.getElementById("decryptButton");
    elements.decryptedOutput = document.getElementById("decryptedOutput");
    elements.decryptStatus = document.getElementById("decryptStatus");
}

// Setup event listeners
function setupEventListeners() {
    // Encryption
    elements.encryptButton.addEventListener('click', handleEncryption);
    document.getElementById('generateIvButton').addEventListener('click', generateIV);
    document.getElementById('copyEncryptedBtn').addEventListener('click', copyEncryptedOutput);
    document.getElementById('downloadEncryptedBtn').addEventListener('click', downloadEncrypted);
    document.getElementById('pastePlainTextBtn').addEventListener('click', handlePastePlainText);
    
    // Decryption
    elements.decryptButton.addEventListener('click', handleDecryption);
    document.getElementById('uploadEncryptedBtn').addEventListener('change', handleFileUpload);
    document.getElementById('copyDecryptedBtn').addEventListener('click', copyDecryptedOutput);
    document.getElementById('pasteEncryptedBtn').addEventListener('click', handlePasteFromClipboard);
    
    // Add input validation for encrypted text field
    elements.encryptedText.addEventListener('input', validateEncryptedTextInput);
    
    // Add input validation for secret key fields
    elements.secretKey.addEventListener('input', validateSecretKey);
    elements.decSecretKey.addEventListener('input', validateSecretKey);
}

// Handle encryption process
function handleEncryption() {
    try {
        const plainText = elements.plainText.value;
        const secretKey = elements.secretKey.value;
        const iv = elements.iv.value;
        const mode = elements.cipherMode.value;
        const padding = elements.padding.value;
        
        // Validate inputs
        if (!plainText) {
            showErrorMessage("Please enter text to encrypt", "encryptStatus");
            return;
        }
        
        if (!secretKey) {
            showErrorMessage("Please enter a secret key", "encryptStatus");
            return;
        }
        
        if (secretKey.length !== 16) {
            showErrorMessage("Secret key must be exactly 16 characters long", "encryptStatus");
            return;
        }
        
        // Encrypt the data
        const result = encryptAES(plainText, secretKey, iv, mode, padding);
        if (elements.encryptedOutput.tagName.toLowerCase() === 'textarea') {
            elements.encryptedOutput.value = result.binaryText;
        } else {
            elements.encryptedOutput.textContent = result.binaryText;
        }
        
        showSuccessMessage("Text encrypted successfully!", "encryptStatus");
    } catch (error) {
        showErrorMessage("Encryption failed: " + error.message, "encryptStatus");
    }
}

// Handle decryption process - simplified version based on original working code
function handleDecryption() {
    try {
        // Get user input
        const binaryEncryptedText = elements.encryptedText.value;
        const secretKey = elements.decSecretKey.value;
        const iv = elements.decIv.value;
        const mode = elements.decipherMode.value;
        const padding = elements.decPadding.value;
        
        // Clear previous output
        if (elements.decryptedOutput) {
            elements.decryptedOutput.value = '';
        }
        
        // Validate inputs
        if (!binaryEncryptedText) {
            showErrorMessage("Please enter encrypted text to decrypt", "decryptStatus");
            return;
        }
        
        if (!secretKey) {
            showErrorMessage("Please enter a secret key", "decryptStatus");
            return;
        }
        
        console.log('Decrypting with:', {
            textLength: binaryEncryptedText.length,
            keyLength: secretKey.length
        });
        
        try {
            // Try to convert binary to string and decrypt
            let encryptedText = binaryEncryptedText;
            
            // Check if input looks like binary
            if (/^[01\s]+$/.test(binaryEncryptedText.trim())) {
                console.log('Input appears to be binary, converting...');
                encryptedText = binaryToString(binaryEncryptedText);
            } else {
                console.log('Input does not appear to be binary, using directly');
            }
            
            // Create key and IV objects
            const key = CryptoJS.enc.Utf8.parse(secretKey);
            let ivParsed = iv ? CryptoJS.enc.Utf8.parse(iv) : 
                CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
            
            // Attempt decryption
            console.log('Attempting decryption with:', encryptedText.substring(0, 20) + '...');
            const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
                iv: ivParsed,
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding]
            });
            
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            console.log('Decryption result length:', decryptedText.length);
            
            if (decryptedText) {
                elements.decryptedOutput.value = decryptedText;
                showSuccessMessage("Text decrypted successfully!", "decryptStatus");
            } else {
                showErrorMessage("Decryption produced empty result. Check your key.", "decryptStatus");
            }
        } catch (decryptError) {
            console.error('Decryption error:', decryptError);
            
            // Try with stored value as fallback
            if (window.lastEncryptedText) {
                try {
                    console.log('Trying with stored encrypted text');
                    const key = CryptoJS.enc.Utf8.parse(secretKey);
                    const ivParsed = iv ? CryptoJS.enc.Utf8.parse(iv) : 
                        CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
                    
                    const decrypted = CryptoJS.AES.decrypt(window.lastEncryptedText, key, {
                        iv: ivParsed,
                        mode: CryptoJS.mode[mode],
                        padding: CryptoJS.pad[padding]
                    });
                    
                    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
                    if (decryptedText) {
                        elements.decryptedOutput.value = decryptedText;
                        showSuccessMessage("Text decrypted successfully!", "decryptStatus");
                        return;
                    }
                } catch (e) {
                    console.log('Stored text decryption failed:', e);
                }
            }
            
            showErrorMessage("Decryption failed: " + decryptError.message, "decryptStatus");
        }
    } catch (error) {
        console.error('Unexpected error in handleDecryption:', error);
        showErrorMessage("Decryption failed: " + error.message, "decryptStatus");
    }
}

// Generate a random IV
function generateIV() {
    const iv = generateRandomIV();
    elements.iv.value = iv;
    showSuccessMessage("Random IV generated", "encryptStatus");
}

// Copy encrypted output to clipboard
function copyEncryptedOutput() {
    const text = elements.encryptedOutput.value;
    if (!text) {
        showErrorMessage("No encrypted text to copy", "encryptStatus");
        return;
    }
    
    copyToClipboard(text).then(() => {
        showSuccessMessage("Encrypted text copied to clipboard", "encryptStatus");
    }).catch(() => {
        showErrorMessage("Failed to copy text", "encryptStatus");
    });
}

// Copy decrypted output to clipboard
function copyDecryptedOutput() {
    const text = elements.decryptedOutput.value;
    if (!text) {
        showErrorMessage("No decrypted text to copy", "decryptStatus");
        return;
    }
    
    copyToClipboard(text).then(() => {
        showSuccessMessage("Decrypted text copied to clipboard", "decryptStatus");
    }).catch(() => {
        showErrorMessage("Failed to copy text", "decryptStatus");
    });
}

// Download encrypted text as a file
function downloadEncrypted() {
    const text = elements.encryptedOutput.value;
    if (!text) {
        showErrorMessage("No encrypted text to download", "encryptStatus");
        return;
    }
    
    downloadTextAsFile(text, "encrypted-data.txt");
    showSuccessMessage("File downloaded successfully", "encryptStatus");
}

// Handle file upload for decryption
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    
    readFile(file).then(content => {
        // Validate binary string from file
        if (isValidBinaryString(content)) {
            elements.encryptedText.value = content.trim();
            showSuccessMessage("File loaded successfully", "decryptStatus");
        } else {
            showErrorMessage("File contains invalid binary string. Only 1s, 0s, and spaces are allowed.", "decryptStatus");
        }
    }).catch(error => {
        showErrorMessage("Failed to read file: " + error.message, "decryptStatus");
    });
}

// Handle paste from clipboard for encryption
function handlePastePlainText() {
    pastePlainTextFromClipboard().then(text => {
        if (text) {
            elements.plainText.value = text.trim();
            showSuccessMessage("Text pasted from clipboard", "pasteEncryptError");
        }
    }).catch(error => {
        console.error("Paste error:", error);
    });
}

// Handle paste from clipboard for decryption
function handlePasteFromClipboard() {
    pasteFromClipboard().then(text => {
        if (text) {
            // Validate binary string
            if (isValidBinaryString(text)) {
                elements.encryptedText.value = text.trim();
                showSuccessMessage("Text pasted from clipboard", "pasteError");
            } else {
                showErrorMessage("Invalid binary string. Only 1s, 0s, and spaces are allowed.", "pasteError");
            }
        }
    }).catch(error => {
        console.error("Paste error:", error);
    });
}

// Validate binary string (only 1s, 0s, and spaces)
function isValidBinaryString(text) {
    const trimmedText = text.trim();
    // Allow only 1, 0, and space characters
    const binaryPattern = /^[10\s]+$/;
    return binaryPattern.test(trimmedText) && trimmedText.length > 0;
}

// Validate encrypted text input as user types
function validateEncryptedTextInput(event) {
    const input = event.target;
    const value = input.value;
    
    // If value is empty, don't show error
    if (value.trim() === '') {
        input.style.borderColor = '';
        return;
    }
    
    // Check if the input contains only valid binary characters
    if (!isValidBinaryString(value)) {
        input.style.borderColor = 'var(--error-color)';
        showErrorMessage("Invalid binary string. Only 1s, 0s, and spaces are allowed.", "pasteError");
    } else {
        input.style.borderColor = 'var(--success-color)';
        // Clear error message if valid
        const errorElement = document.getElementById('pasteError');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.className = 'status-message';
        }
    }
}

// Initialize collapsible sections
function initCollapsibles() {
    console.log('Initializing collapsible sections');
    const collapsibles = document.querySelectorAll('.collapsible-header');
    console.log('Found collapsible elements:', collapsibles.length);
    
    collapsibles.forEach(item => {
        // Remove any existing event listeners (to avoid duplicates)
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('click', function() {
            console.log('Collapsible clicked:', this.getAttribute('data-target'));
            this.classList.toggle('active');
            const contentId = this.getAttribute('data-target');
            const content = document.getElementById(contentId);
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                setTimeout(() => {
                    content.style.padding = '0';
                    content.style.border = 'none';
                    content.classList.remove('active');
                }, 200);
            } else {
                content.classList.add('active');
                content.style.padding = '15px';
                content.style.border = '1px solid var(--border-color)';
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 200 + 'px';
                }, 10);
            }
        });
    });
}

// Validate secret key input as user types
function validateSecretKey(event) {
    const input = event.target;
    const value = input.value;
    const currentLength = value.length;
    const maxLength = 16;
    
    // Determine which counter to update
    let counter;
    if (input.id === 'secretKey') {
        counter = elements.secretKeyCounter;
    } else if (input.id === 'decSecretKey') {
        counter = elements.decSecretKeyCounter;
    }
    
    // Update character counter
    if (counter) {
        counter.textContent = `${currentLength}/${maxLength}`;
        
        // Update counter styling
        counter.classList.remove('valid', 'invalid');
        if (currentLength === 0) {
            // Default state
        } else if (currentLength === maxLength) {
            counter.classList.add('valid');
        } else {
            counter.classList.add('invalid');
        }
    }
    
    // Update input border color
    if (value.trim() === '') {
        input.style.borderColor = '';
    } else if (currentLength === maxLength) {
        input.style.borderColor = 'var(--success-color)';
    } else {
        input.style.borderColor = 'var(--error-color)';
    }
}
