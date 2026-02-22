/**
 * UI Helper Functions
 */

// Show success message
function showSuccessMessage(message, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = 'success-message';
    setTimeout(() => {
        element.className = '';
    }, 3000);
}

// Show error message
function showErrorMessage(message, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = 'error-message';
    setTimeout(() => {
        element.className = '';
    }, 3000);
}

// Copy text to clipboard
function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (!navigator.clipboard) {
            fallbackCopyToClipboard(text);
            resolve(true);
            return;
        }
        navigator.clipboard.writeText(text)
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
                fallbackCopyToClipboard(text);
                resolve(false);
            });
    });
}

// Fallback copy to clipboard for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Could not copy text', err);
    }
    
    document.body.removeChild(textArea);
}

// Toggle collapsible sections
function toggleCollapsible(id) {
    const content = document.getElementById(id);
    content.classList.toggle('active');
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = '0';
        content.style.border = 'none';
    } else {
        content.style.maxHeight = content.scrollHeight + 200 + "px"; // Add extra space for padding
        content.style.padding = '15px';
        content.style.border = '1px solid var(--border-color)';
    }
}

// Download text as a file
function downloadTextAsFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'encrypted-data.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Paste text from clipboard
function pasteFromClipboard() {
    return new Promise((resolve, reject) => {
        if (!navigator.clipboard) {
            showErrorMessage("Your browser doesn't allow clipboard access. Please paste manually.", "pasteError");
            resolve(false);
            return;
        }
        
        navigator.clipboard.readText()
            .then(text => {
                resolve(text);
            })
            .catch(err => {
                console.error('Could not paste text: ', err);
                showErrorMessage("Your browser doesn't allow clipboard access. Please paste manually.", "pasteError");
                reject(err);
            });
    });
}

// Paste plain text from clipboard for encryption
function pastePlainTextFromClipboard() {
    return new Promise((resolve, reject) => {
        if (!navigator.clipboard) {
            showErrorMessage("Your browser doesn't allow clipboard access. Please paste manually.", "pasteEncryptError");
            resolve(false);
            return;
        }
        
        navigator.clipboard.readText()
            .then(text => {
                resolve(text);
            })
            .catch(err => {
                console.error('Could not paste text: ', err);
                showErrorMessage("Your browser doesn't allow clipboard access. Please paste manually.", "pasteEncryptError");
                reject(err);
            });
    });
}

// Read text file
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
}
