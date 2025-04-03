# password-protections-by-aes-and-binary

# AES Encryption/Decryption Webpage

# Overview

# This project provides a web-based tool for encrypting and decrypting text using AES-128 in CBC mode.

this is single webpage project that is used for you personal password encryption and decryption 

if you deal 🤝 with 10 to 20 or 100000 username and password so this is right place to explore

use this single webpage for encryption and decryption and store on your note (i.e google keep note)

#Encryption
this generate the string into binary

#Decryption
this generate binary to string


Features

zConverts text to binary before encryption.

Uses AES-128 with CBC mode and PKCS5 padding.

Allows specifying an Initialization Vector (IV) and Secret Key.

Provides encrypted output in binary format.

Decrypts binary encrypted text back to the original string.

Setup

Download the crypto-js.js library and place it in the project folder.

Ensure the index.html file includes the local crypto-js.js instead of a CDN.

Open the index.html file in a web browser to use the tool.

Usage

Enter text in the encryption section and provide a secret key.

Click 'Encrypt' to get the binary encrypted output.

Copy the binary output and paste it in the decryption section.

Enter the same secret key and IV, then click 'Decrypt' to retrieve the original text.

Dependencies

CryptoJS (local version included in the project)

Notes

If no IV is provided, a default zero-based IV is used.

The key should be exactly 16 characters long (128 bits).

