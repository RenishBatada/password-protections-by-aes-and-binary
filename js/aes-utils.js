/**
 * AES Encryption and Decryption Utility Functions
 */

// Make sure CryptoJS is available
if (typeof CryptoJS === 'undefined') {
    console.error('CryptoJS library is not loaded!');
}

// Convert a string to binary representation
function stringToBinary(str) {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// Convert binary representation back to string
function binaryToString(binary) {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

// AES encrypt text using provided key and options
function encryptAES(plainText, secretKey, iv, mode = 'CBC', padding = 'Pkcs7') {
    try {
        if (!plainText || !secretKey) {
            throw new Error("Plain text and secret key are required");
        }
        
        // Add magic number prefix to validate decryption
        const magicNumber = "AES_VALID";
        const textWithMagic = magicNumber + plainText;
        
        const key = CryptoJS.enc.Utf8.parse(secretKey);
        const ivParsed = typeof iv === "string" && iv ? 
            CryptoJS.enc.Utf8.parse(iv) : 
            CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        
        const encrypted = CryptoJS.AES.encrypt(textWithMagic, key, {
            iv: ivParsed,
            mode: CryptoJS.mode[mode],
            padding: CryptoJS.pad[padding]
        });
        
        return {
            encryptedText: encrypted.toString(),
            binaryText: stringToBinary(encrypted.toString())
        };
    } catch (error) {
        console.error("Encryption error:", error);
        throw error;
    }
}

// AES decrypt binary text using provided key and options
function decryptAES(binaryEncryptedText, secretKey, iv, mode = 'CBC', padding = 'Pkcs7') {
    try {
        if (!binaryEncryptedText || !secretKey) {
            throw new Error("Encrypted text and secret key are required");
        }
        
        const encryptedText = binaryToString(binaryEncryptedText);
        const key = CryptoJS.enc.Utf8.parse(secretKey);
        const ivParsed = typeof iv === "string" && iv ? 
            CryptoJS.enc.Utf8.parse(iv) : 
            CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
        
        const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
            iv: ivParsed,
            mode: CryptoJS.mode[mode],
            padding: CryptoJS.pad[padding]
        });
        
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        
        // Validate magic number to check if key is correct
        const magicNumber = "AES_VALID";
        if (!decryptedText.startsWith(magicNumber)) {
            throw new Error("Invalid secret key or corrupted data. The provided key cannot decrypt this data.");
        }
        
        // Remove magic number and return actual content
        return decryptedText.substring(magicNumber.length);
    } catch (error) {
        console.error("Decryption error:", error);
        throw error;
    }
}

// Generate a random initialization vector
function generateRandomIV() {
    return CryptoJS.lib.WordArray.random(16).toString();
}
