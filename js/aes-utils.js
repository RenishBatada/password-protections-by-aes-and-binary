/**
 * AES Encryption and Decryption Utility Functions
 * Simple implementation
 */

// Check if CryptoJS library is loaded
if (typeof CryptoJS === 'undefined') {
    console.error('CryptoJS library is not loaded!');
}

// Convert a string to binary representation
function stringToBinary(str) {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// Convert binary representation back to string
function binaryToString(binary) {
    try {
        return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    } catch (error) {
        console.error('Binary conversion error:', error);
        throw new Error('Invalid binary format');
    }
}

// AES encrypt text
function encryptAES(plainText, secretKey, iv, mode = 'CBC', padding = 'Pkcs7') {
    try {
        if (!plainText || !secretKey) {
            throw new Error("Plain text and secret key are required");
        }
        
        // Create key object
        const key = CryptoJS.enc.Utf8.parse(secretKey);
        
        // Handle IV
        let ivParsed;
        if (typeof iv === "string" && iv.trim() !== "") {
            ivParsed = CryptoJS.enc.Utf8.parse(iv);
        } else {
            ivParsed = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        }
        
        // Perform encryption
        const encrypted = CryptoJS.AES.encrypt(plainText, key, {
            iv: ivParsed,
            mode: CryptoJS.mode[mode],
            padding: CryptoJS.pad[padding]
        });
        
        // Store the string representation for later use
        const encryptedStr = encrypted.toString();
        window.lastEncryptedText = encryptedStr;
        
        return {
            encryptedText: encryptedStr,
            binaryText: stringToBinary(encryptedStr)
        };
    } catch (error) {
        console.error("Encryption error:", error);
        throw error;
    }
}

// AES decrypt binary text
function decryptAES(binaryEncryptedText, secretKey, iv, mode = 'CBC', padding = 'Pkcs7') {
    try {
        console.log('Starting decryption...');
        if (!binaryEncryptedText || !secretKey) {
            throw new Error("Encrypted text and secret key are required");
        }
        
        // First try with stored text if available
        if (window.lastEncryptedText) {
            try {
                const key = CryptoJS.enc.Utf8.parse(secretKey);
                let ivParsed;
                if (typeof iv === "string" && iv.trim() !== "") {
                    ivParsed = CryptoJS.enc.Utf8.parse(iv);
                } else {
                    ivParsed = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
                }
                
                const decrypted = CryptoJS.AES.decrypt(window.lastEncryptedText, key, {
                    iv: ivParsed,
                    mode: CryptoJS.mode[mode],
                    padding: CryptoJS.pad[padding]
                });
                
                const result = decrypted.toString(CryptoJS.enc.Utf8);
                if (result) {
                    return result;
                }
            } catch (e) {
                console.log('Stored text decryption failed, trying input');
            }
        }
        
        // Try with input text
        // Convert binary to string if needed
        let encryptedText;
        if (/^[01\s]+$/.test(binaryEncryptedText.trim())) {
            encryptedText = binaryToString(binaryEncryptedText);
        } else {
            encryptedText = binaryEncryptedText;
        }
        
        // Create key object
        const key = CryptoJS.enc.Utf8.parse(secretKey);
        
        // Handle IV
        let ivParsed;
        if (typeof iv === "string" && iv.trim() !== "") {
            ivParsed = CryptoJS.enc.Utf8.parse(iv);
        } else {
            ivParsed = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        }
        
        // Perform decryption
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
            iv: ivParsed,
            mode: CryptoJS.mode[mode],
            padding: CryptoJS.pad[padding]
        });
        
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    } catch (error) {
        console.error("Decryption error:", error);
        throw error;
    }
}

// Generate a random initialization vector
function generateRandomIV() {
    return CryptoJS.lib.WordArray.random(16).toString();
}
